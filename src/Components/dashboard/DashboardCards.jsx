import { useEffect, useState } from "react";
import { supabase } from "../../Js/database/supabaseClient";

export const DashboardCards = () => {
  const [totalActivities, setTotalActivities] = useState(0);
  const [finishedActivities, setFinishedActivities] = useState(0);
  const [bugs, setBugs] = useState(0);
  const [meetings, setMeetings] = useState(0);

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      // Get total number of activities
      const { data: totalData, error: totalError } = await supabase
        .from("activities")
        .select("*");
      if (totalError) throw totalError;
      setTotalActivities(totalData.length);

      // Get finished activities (idEstado === 1)
      const { data: finishedData, error: finishedError } = await supabase
        .from("activities")
        .select("*")
        .eq("idEstado", 1);
      if (finishedError) throw finishedError;
      setFinishedActivities(finishedData.length);

      // Get bugs (idTipo === 2)
      const { data: bugsData, error: bugsError } = await supabase
        .from("activities")
        .select("*")
        .eq("idTipo", 2);
      if (bugsError) throw bugsError;
      setBugs(bugsData.length);

      // Get meetings (idTipo === 3)
      const { data: meetingsData, error: meetingsError } = await supabase
        .from("activities")
        .select("*")
        .eq("idTipo", 3);
      if (meetingsError) throw meetingsError;
      setMeetings(meetingsData.length);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500  rounded-lg shadow-md text-white">
        <h3 className="text-lg font-semibold">Total de Actividades</h3>
        <p className="text-2xl font-bold">{totalActivities}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md bg-gradient-to-br from-teal-400 to-green-500 text-white">
        <h3 className="text-lg font-semibold">Actividades Terminadas</h3>
        <p className="text-2xl font-bold">{finishedActivities}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md bg-gradient-to-r from-rose-500 to-red-500 text-white">
        <h3 className="text-lg font-semibold">Bugs</h3>
        <p className="text-2xl font-bold">{bugs}</p>
      </div>
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Reuniones</h3>
        <p className="text-2xl font-bold">{meetings}</p>
      </div>
    </div>
  );
};
