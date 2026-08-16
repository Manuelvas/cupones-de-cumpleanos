export default async function handler(req, res) {

    // Solo permitimos solicitudes POST
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    try {

        const { nombreCupon } = req.body;

        // Verificar que recibimos el nombre del cupón
        if (!nombreCupon) {
            return res.status(400).json({
                error: "Falta el nombre del cupón"
            });
        }

        // Variables privadas de Vercel
        const token = process.env.WHATSAPP_TOKEN;
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const numeroDestino = process.env.WHATSAPP_DESTINATION;

        if (!token || !phoneNumberId || !numeroDestino) {
            return res.status(500).json({
                error: "Faltan variables de WhatsApp en Vercel"
            });
        }

        console.log("📱 Intentando enviar plantilla de WhatsApp");
        console.log("🎟️ Cupón:", nombreCupon);

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

                    type: "template",

                    template: {
                        name: "cupon_utilizado",

                        language: {
                            code: "es"
                        },

                        components: [
                            {
                                type: "body",

                                parameters: [
                                    {
                                        type: "text",
                                        text: nombreCupon
                                    }
                                ]
                            }
                        ]
                    }
                })
            }
        );

        const resultado = await respuesta.json();

        console.log("📨 Respuesta de WhatsApp:", resultado);

        if (!respuesta.ok) {

            console.error(
                "❌ WhatsApp rechazó la plantilla:",
                resultado
            );

            return res.status(500).json({
                error: "WhatsApp rechazó la plantilla",
                detalle: resultado
            });
        }

        return res.status(200).json({
            success: true,
            mensaje: "Plantilla enviada correctamente",
            metaStatus: respuesta.status,
            metaResponse: resultado
        });

    } catch (error) {

        console.error("❌ Error interno:", error);

        return res.status(500).json({
            error: "Error interno del servidor",
            detalle: error.message
        });
    }
}