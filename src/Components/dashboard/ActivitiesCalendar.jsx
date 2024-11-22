import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import { supabase } from "../../Js/database/supabaseClient";

// Estilos para el modal
Modal.setAppElement("#root");

export const ActivitiesCalendar = () => {
  const [activities, setActivities] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activitiesForDay, setActivitiesForDay] = useState([]);

  // Fetch activities from Supabase
  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase.from("activities").select("*");
      if (error) throw error;
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error.message);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle day click
  const handleDayClick = (date) => {
    // setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    const activitiesOnDate = activities.filter((activity) => {
      const activityDate = activity.fechaCreacion;
      // Verificamos si activity.fechaCreacion es válido
      if (activityDate && typeof activityDate === "string") {
        return activityDate.split("T")[0] === formattedDate;
      }
      return false; // Si fechaCreacion es inválida, lo ignoramos
    });
    setActivitiesForDay(activitiesOnDate);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-4">
      <Calendar
        onClickDay={handleDayClick}
        tileClassName={({ date, view }) => {
          if (view === "month" && date) {
            const formattedDate = date.toISOString().split("T")[0];
            if (
              activities.some((activity) => {
                const activityDate = activity.fechaCreacion;
                // Verificamos si activity.fechaCreacion es válido
                if (activityDate && typeof activityDate === "string") {
                  return activityDate.split("T")[0] === formattedDate;
                }
                return false;
              })
            ) {
              return "highlight"; // Clase CSS para días con actividades
            }
          }
          return null;
        }}
      />

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Activities Modal"
        className="bg-white rounded-lg shadow-lg p-6 w-1/2 mx-auto mt-20"
        overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4">Actividades del Día</h2>
        {activitiesForDay.length > 0 ? (
          <ul>
            {activitiesForDay.map((activity) => (
              <li key={activity.id} className="mb-2">
                {activity.actividad}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay actividades para este día.</p>
        )}
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Cerrar
        </button>
      </Modal>

      <style>
        {`
          .highlight {
            background-color: #4caf50 !important;
            color: white !important;
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};
