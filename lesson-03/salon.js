const getAppointment = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const appointmentExists = false;
            if(appointmentExists) {
                resolve({
                    id: 1,
                    customerName: "Priya",
                    service: "Facial",
                    price: 800
                })
            } else {
                reject("Appointment not found");
            }
        }, 2000);
    })
}

const getAppointmentData = async() => {
    try {
        const appointment = await getAppointment();
        console.log(appointment);
    } catch (error) {
        console.log("Error: ",error);
    }
}

getAppointmentData();