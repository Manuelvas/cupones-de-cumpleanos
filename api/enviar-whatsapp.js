export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Método no permitido"
        });
    }

    try {

        const { nombreCupon } = req.body;

        if (!nombreCupon) {
            return res.status(400).json({
                error: "Falta el nombre del cupón"
            });
        }

        const token = process.env.WHATSAPP_TOKEN;
        const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        const numeroDestino = process.env.WHATSAPP_DESTINATION;

        if (!token || !phoneNumberId || !numeroDestino) {
            return res.status(500).json({
                error: "Faltan variables de WhatsApp en Vercel"
            });
        }

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
                        }
                    }
                })
            }
        );

        const resultado = await respuesta.json();

        console.log(
            "Respuesta de Meta:",
            JSON.stringify(resultado, null, 2)
        );

        if (!respuesta.ok) {
            return res.status(500).json({
                error: "WhatsApp rechazó la plantilla",
                detalle: resultado
            });
        }

        return res.status(200).json({
            success: true,
            metaStatus: respuesta.status,
            metaResponse: resultado
        });

    } catch (error) {

        console.error(
            "Error interno:",
            error
        );

        return res.status(500).json({
            error: "Error interno del servidor",
            detalle: error.message
        });
    }
}