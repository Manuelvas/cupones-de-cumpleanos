export default async function handler(req, res) {

    // Solo permitimos solicitudes POST
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    try {

        const {
            nombreCupon
        } = req.body;

        // Verificar que recibimos el nombre
        if (!nombreCupon) {
            return res.status(400).json({
                error: "Falta el nombre del cupón"
            });
        }

        // Variables privadas guardadas en Vercel
        const token = process.env.WHATSAPP_TOKEN;
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const numeroDestino = process.env.WHATSAPP_DESTINATION;

        if (!token || !phoneNumberId || !numeroDestino) {
            return res.status(500).json({
                error: "Faltan variables de WhatsApp en Vercel"
            });
        }

        const mensaje =
            `💝 Se utilizó un cupón\n\n` +
            `🎟️ Cupón: ${nombreCupon}\n\n` +
            `❤️ Tu regalo está siendo disfrutado.`;

        const respuesta = await fetch(
            `https://graph.facebook.com/v25.0/${phoneNumberId}/messages`,
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: numeroDestino,
                    type: "text",
                    text: {
                        body: mensaje
                    }
                })
            }
        );

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            console.error("Error de WhatsApp:", resultado);

            return res.status(500).json({
                error: "WhatsApp rechazó el mensaje",
                detalle: resultado
            });
        }

       return res.status(200).json({
    success: true,
    metaStatus: respuesta.status,
    metaResponse: resultado
});

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}