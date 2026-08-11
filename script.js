/* =========================================
   CONFIGURACIÓN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const birthdayScreen =
        document.getElementById("birthdayScreen");

    const surpriseScreen =
        document.getElementById("surpriseScreen");

    const couponsScreen =
        document.getElementById("couponsScreen");


    const startButton =
        document.getElementById("startButton");

    const birthdayNextButton =
        document.getElementById("birthdayNextButton");

    const discoverButton =
        document.getElementById("discoverButton");

        const couponTimer =
    document.getElementById("couponTimer");

        const couponModal =
    document.getElementById("couponModal");

    const limitModal =
        document.getElementById("limitModal");

    const closeCouponModal =
        document.getElementById("closeCouponModal");

    const cancelCoupon =
        document.getElementById("cancelCoupon");

    const confirmCoupon =
        document.getElementById("confirmCoupon");

    const closeLimitModal =
        document.getElementById("closeLimitModal");

    const closeLimitButton =
        document.getElementById("closeLimitButton");

    const modalCouponTitle =
        document.getElementById("modalCouponTitle");

    const modalCouponEmoji =
        document.getElementById("modalCouponEmoji");

    const modalCouponDescription =
        document.getElementById(
            "modalCouponDescription"
        );

        const couponSuccess =
    document.getElementById(
        "couponSuccess"
    );

    const closeSuccess =
        document.getElementById(
            "closeSuccess"
        );

        const secretUnlockModal =
    document.getElementById(
        "secretUnlockModal"
    );

    const discoverSecretCoupons =
        document.getElementById(
            "discoverSecretCoupons"
        );

    const secretCouponsSection =
        document.getElementById(
            "secretCouponsSection"
        );

    const secretCouponsContainer =
        document.getElementById(
            "secretCoupons"
        );

        const secretCouponCounter =
    document.getElementById(
        "secretCouponCounter"
    );

    const finalCouponModal =
    document.getElementById(
        "finalCouponModal"
    );

const closeFinalCoupon =
    document.getElementById(
        "closeFinalCoupon"
    );


















    const resetTimerButton =
        document.getElementById(
            "resetTimerButton"
        );

    const resetCouponsButton =
        document.getElementById(
            "resetCouponsButton"
        );

    const resetAllButton =
        document.getElementById(
            "resetAllButton"
        );











    

// =========================================
// MOSTRAR MENSAJE DE ÉXITO
// =========================================

let successTimeout = null;


function showCouponSuccess() {

    couponSuccess.classList.add(
        "active"
    );


    clearTimeout(
        successTimeout
    );


    successTimeout =
        setTimeout(() => {

            couponSuccess.classList.remove(
                "active"
            );

        }, 5000);

}

closeSuccess.addEventListener(
    "click",
    () => {

        couponSuccess.classList.remove(
            "active"
        );

        clearTimeout(
            successTimeout
        );

    }
);

        let selectedCouponId = null;


function openCouponModal(coupon) {

    selectedCouponId =
        coupon.id;


    modalCouponTitle.textContent =
        coupon.title;


    modalCouponEmoji.textContent =
        coupon.emoji;


    modalCouponDescription.textContent =
        coupon.description;


    couponModal.classList.add("active");

}

function closeCouponModalWindow() {

    couponModal.classList.remove("active");

    selectedCouponId = null;

}

closeCouponModal.addEventListener(
    "click",
    closeCouponModalWindow
);


cancelCoupon.addEventListener(
    "click",
    closeCouponModalWindow
);

confirmCoupon.addEventListener(
    "click",
    () => {

        if (
            selectedCouponId === null
        ) {
            return;
        }


        const couponId =
            selectedCouponId;


        closeCouponModalWindow();


        useCoupon(couponId);

    }
);

/* =========================================
   UTILIZAR CUPÓN
========================================= */

function useCoupon(couponId) {

    if (!canUseCoupon()) {

        limitModal.classList.add(
            "active"
        );

        return;

    }


    // =====================================
    // MARCAR COMO UTILIZADO
    // =====================================

    usedCoupons.push(
        couponId
    );


    // =====================================
    // GUARDAR CUPÓN
    // =====================================

    localStorage.setItem(
        "usedCoupons",
        JSON.stringify(
            usedCoupons
        )
    );


    // =====================================
    // REGISTRAR HORA
    // =====================================

    couponUsage.push({

        id: couponId,

        time: Date.now()

    });


    // =====================================
    // GUARDAR REGISTRO
    // =====================================

    localStorage.setItem(
        "couponUsage",
        JSON.stringify(
            couponUsage
        )
    );


    // =====================================
    // ACTUALIZAR CUPONES
    // =====================================

    renderCoupons();


    // =====================================
    // BUSCAR CUPÓN UTILIZADO
    // =====================================

    const usedCards =
        document.querySelectorAll(
            "#usedCoupons .coupon-card"
        );


    let usedCard = null;


    usedCards.forEach(card => {

        const number =
            card.querySelector(
                ".coupon-number"
            );


        if (!number) {
            return;
        }


        const expectedNumber =
            `CUPÓN ${String(couponId).padStart(2, "0")}`;


        if (
            number.textContent.trim()
            === expectedNumber
        ) {

            usedCard = card;

        }

    });


    // =====================================
    // ANIMAR CUPÓN
    // =====================================

    if (usedCard) {

    usedCard.classList.add(
        "coupon-used-animation"
    );

}


    // =====================================
    // MOSTRAR MENSAJE
    // =====================================

    setTimeout(() => {

        showCouponSuccess();

    }, 350);

}


/* =========================================
   MODO DE PRUEBAS
========================================= */


/* Reiniciar solamente el límite de 24 horas */

resetTimerButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "couponUsage"
        );

        couponUsage = [];


        updateCouponTimer();


        alert(
            "Límite de 24 horas reiniciado."
        );

    }
);


/* =========================================
   REINICIAR CUPONES
========================================= */

resetCouponsButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "usedCoupons"
        );


        localStorage.removeItem(
            "secretCouponsUnlocked"
        );


        usedCoupons = [];

        secretCouponsUnlocked = false;


        renderCoupons();


        updateCouponTimer();


        alert(
            "Los 21 cupones y los secretos han sido reiniciados."
        );

    }
);


/* =========================================
   REINICIAR TODO
========================================= */

resetAllButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "usedCoupons"
        );


        localStorage.removeItem(
            "couponUsage"
        );


        localStorage.removeItem(
            "secretCouponsUnlocked"
        );


        usedCoupons = [];

        couponUsage = [];

        secretCouponsUnlocked = false;


        renderCoupons();

        updateCouponTimer();


        alert(
            "Todo el progreso ha sido reiniciado."
        );

    }
);




















    




    /* =========================================
       CAMBIAR DE PANTALLA
    ========================================= */

    function changeScreen(currentScreen, nextScreen) {

        currentScreen.classList.remove("active");

        setTimeout(() => {

            nextScreen.classList.add("active");

        }, 150);

    }


    /* =========================================
       BOTÓN DE BIENVENIDA
    ========================================= */

    startButton.addEventListener("click", () => {

        changeScreen(
            welcomeScreen,
            birthdayScreen
        );

        startConfetti();

    });


    /* =========================================
       BOTÓN CUMPLEAÑOS
    ========================================= */

    birthdayNextButton.addEventListener("click", () => {

        changeScreen(
            birthdayScreen,
            surpriseScreen
        );

    });


    /* =========================================
       DESCUBRIR SORPRESA
    ========================================= */

    discoverButton.addEventListener("click", () => {

        changeScreen(
            surpriseScreen,
            couponsScreen
        );

    });


    /* =========================================
       CONFETI
    ========================================= */

    function startConfetti() {

        const container =
            document.getElementById("confetti-container");

        container.innerHTML = "";

        const pieces = 80;


        for (let i = 0; i < pieces; i++) {

            const piece =
                document.createElement("span");


            piece.style.position =
                "absolute";


            piece.style.width =
                `${Math.random() * 7 + 4}px`;


            piece.style.height =
                `${Math.random() * 12 + 6}px`;


            piece.style.left =
                `${Math.random() * 100}%`;


            piece.style.top =
                "-20px";


            piece.style.background =
                getRandomColor();


            piece.style.opacity =
                Math.random() * 0.5 + 0.5;


            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;


            piece.style.borderRadius =
                "2px";


            piece.style.pointerEvents =
                "none";


            const duration =
                Math.random() * 2 + 2;


            piece.style.transition =
                `top ${duration}s linear, transform ${duration}s linear`;


            container.appendChild(piece);


            requestAnimationFrame(() => {

                piece.style.top =
                    `${window.innerHeight + 30}px`;


                piece.style.transform =
                    `rotate(${Math.random() * 1000}deg)`;

            });


            setTimeout(() => {

                piece.remove();

            }, duration * 1000 + 500);

        }

    }


    /* =========================================
       COLORES DEL CONFETI
    ========================================= */

    function getRandomColor() {

        const colors = [

            "#ffffff",
            "#ffd6eb",
            "#ff9dcc",
            "#f8c8dc",
            "#e8b4cb",
            "#ffe8f3"

        ];


        return colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    }


    /* =========================================
       CUPONES
    ========================================= */

    const coupons = [

        {
            id: 1,
            emoji: "🍿",
            title: "Noche de películas",
            description:
                "Tú eliges la película y yo pongo los abrazos."
        },

        {
            id: 2,
            emoji: "🍕",
            title: "Cena juntos",
            description:
                "Una cena especial solo para nosotros."
        },

        {
            id: 3,
            emoji: "💆",
            title: "Día de consentirte",
            description:
                "Hoy tú eres la consentida."
        },

        {
            id: 4,
            emoji: "🌹",
            title: "Una cita sorpresa",
            description:
                "Yo preparo todo. Tú solo tienes que disfrutar."
        },

        {
            id: 5,
            emoji: "🍦",
            title: "Antojo cumplido",
            description:
                "Ese antojo que tengas, hoy corre por mi cuenta."
        },

        {
            id: 6,
            emoji: "🤗",
            title: "Abrazo infinito",
            description:
                "Un abrazo de esos que duran mucho más de lo normal."
        },

        {
            id: 7,
            emoji: "☕",
            title: "Una tarde juntos",
            description:
                "Una tarde tranquila para disfrutar solamente nosotros."
        },

        {
            id: 8,
            emoji: "🎮",
            title: "Tú eliges el juego",
            description:
                "Hoy tú decides qué hacemos."
        },

        {
            id: 9,
            emoji: "🍫",
            title: "Chocolate para ti",
            description:
                "Porque nunca está de más consentirte un poquito."
        },

        {
            id: 10,
            emoji: "📸",
            title: "Fotos juntos",
            description:
                "Vamos a crear nuevos recuerdos juntos."
        },

        {
            id: 11,
            emoji: "🌅",
            title: "Una salida especial",
            description:
                "Una salida para guardar otro recuerdo."
        },

        {
            id: 12,
            emoji: "💌",
            title: "Una carta para ti",
            description:
                "Una carta escrita especialmente para ti."
        },

        {
            id: 13,
            emoji: "🎵",
            title: "Tú eliges el plan",
            description:
                "Esta vez tú decides qué hacemos juntos."
        },

        {
            id: 14,
            emoji: "🍰",
            title: "Dulce sorpresa",
            description:
                "Algo dulce especialmente para ti."
        },

        {
            id: 15,
            emoji: "🧸",
            title: "Día de mimos",
            description:
                "Mimos, abrazos y mucho cariño."
        },

        {
            id: 16,
            emoji: "🌸",
            title: "Un detalle sorpresa",
            description:
                "Un pequeño detalle elegido pensando en ti."
        },

        {
            id: 17,
            emoji: "🚗",
            title: "Paseo juntos",
            description:
                "Sube, que hoy nos vamos a crear recuerdos."
        },

        {
            id: 18,
            emoji: "❤️",
            title: "Día solo para nosotros",
            description:
                "Un día para desconectarnos de todo."
        },

        {
            id: 19,
            emoji: "🥰",
            title: "Consentida por mí",
            description:
                "Hoy tienes permiso de dejarte consentir."
        },

        {
            id: 20,
            emoji: "🎁",
            title: "Regalo sorpresa",
            description:
                "Hay algo que preparé especialmente para ti."
        },

        {
            id: 21,
            emoji: "💖",
            title: "Un cupón muy especial",
            description:
                "Este lo dejamos para el final... ❤️"
        }

    ];

    /* =========================================
   CUPONES SECRETOS
========================================= */

const secretCoupons = [

    {
        id: 22,
        emoji: "🎁",
        title: "Sorpresa secreta",
        description:
            "Una sorpresa que preparé especialmente para ti."
    },

    {
        id: 23,
        emoji: "💕",
        title: "Un momento especial",
        description:
            "Un momento solamente para nosotros."
    },

    {
        id: 24,
        emoji: "🌹",
        title: "Una sorpresa más",
        description:
            "Porque todavía tenía algo guardado para ti."
    },

    {
        id: 25,
        emoji: "💖",
        title: "El último secreto",
        description:
            "Este cupón es especialmente importante. ❤️"
    }

];


    /* =========================================
       CUPONES UTILIZADOS
    ========================================= */

    let usedCoupons =
        JSON.parse(
            localStorage.getItem("usedCoupons")
        ) || [];

    /* =========================================
   CUPONES SECRETOS DESBLOQUEADOS
========================================= */

let secretCouponsUnlocked =
    localStorage.getItem(
        "secretCouponsUnlocked"
    ) === "true";


    /* =========================================
       REGISTRO DE USOS
    ========================================= */

    let couponUsage =
        JSON.parse(
            localStorage.getItem("couponUsage")
        ) || [];


    /* =========================================
       OBTENER USOS DE LAS ÚLTIMAS 24 HORAS
    ========================================= */

    function getRecentCouponUses() {

        const now =
            Date.now();


        const twentyFourHours =
            24 * 60 * 60 * 1000;


        couponUsage =
            couponUsage.filter(use => {

                return (
                    now - use.time
                    < twentyFourHours
                );

            });


        localStorage.setItem(
            "couponUsage",
            JSON.stringify(couponUsage)
        );


        return couponUsage;

    }

    // =========================================
// ACTUALIZAR CONTADOR DE 24 HORAS
// =========================================

function updateCouponTimer() {

    const allMainCouponsUsed =
    coupons.every(
        coupon =>
            usedCoupons.includes(
                coupon.id
            )
    );


if (allMainCouponsUsed) {

    couponTimer.innerHTML =
        "💖 Has disfrutado tus 21 cupones";

    return;

}

    const recentUses =
        getRecentCouponUses();


    if (recentUses.length < 3) {

        couponTimer.innerHTML =
            "✨ Tienes cupones disponibles";

        return;

    }


    /*
       Ordenamos los usos del más antiguo
       al más reciente.
    */

    const sortedUses =
        [...recentUses].sort(
            (a, b) =>
                a.time - b.time
        );


    /*
       El próximo cupón se libera cuando
       hayan pasado 24 horas desde el uso
       más antiguo de los tres.
    */

    const oldestUse =
        sortedUses[0].time;


    const availableAt =
        oldestUse +
        (24 * 60 * 60 * 1000);


    const remaining =
        availableAt -
        Date.now();


    if (remaining <= 0) {

        couponTimer.innerHTML =
            "✨ Ya puedes utilizar otro cupón";

        return;

    }


    const hours =
        Math.floor(
            remaining /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (remaining %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (remaining %
                (1000 * 60)) /
            1000
        );


    couponTimer.innerHTML = `

        ⏳ Próximo cupón disponible en

        <strong>
            ${String(hours).padStart(2, "0")} h
            ${String(minutes).padStart(2, "0")} min
            ${String(seconds).padStart(2, "0")} s
        </strong>

    `;

}

setInterval(() => {

    updateCouponTimer();

}, 1000);




   /* =========================================
   ¿PUEDE USAR UN CUPÓN PRINCIPAL?
========================================= */

function canUseMainCoupon() {

    const recentUses =
        getRecentCouponUses();


    return recentUses.length < 3;

}


    /* =========================================
       MOSTRAR CUPONES
    ========================================= */

    function renderCoupons() {

        const availableContainer =
            document.getElementById(
                "availableCoupons"
            );


        const usedContainer =
            document.getElementById(
                "usedCoupons"
            );


        const availableCount =
            document.getElementById(
                "availableCount"
            );


        const usedCount =
            document.getElementById(
                "usedCount"
            );


        /* Limpiar */

        availableContainer.innerHTML = "";

        usedContainer.innerHTML = "";


        /* =====================================
           DISPONIBLES
        ===================================== */

        coupons
            .filter(
                coupon =>
                    !usedCoupons.includes(
                        coupon.id
                    )
            )
            .forEach(coupon => {

                const card =
                    createCouponCard(
                        coupon,
                        false
                    );


                availableContainer.appendChild(
                    card
                );

            });


        /* =====================================
           UTILIZADOS
        ===================================== */

        coupons
            .filter(
                coupon =>
                    usedCoupons.includes(
                        coupon.id
                    )
            )
            .forEach(coupon => {

                const card =
                    createCouponCard(
                        coupon,
                        true
                    );


                usedContainer.appendChild(
                    card
                );

            });


/* =====================================
   CONTADORES DE LOS 21 PRINCIPALES
===================================== */

const mainUsedCount =
    coupons.filter(
        coupon =>
            usedCoupons.includes(
                coupon.id
            )
    ).length;


availableCount.textContent =
    coupons.length -
    mainUsedCount;


usedCount.textContent =
    mainUsedCount;


renderSecretCoupons();

updateCouponTimer();

}


    /* =========================================
       CREAR TARJETA
    ========================================= */

    function createCouponCard(
        coupon,
        used
    ) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "coupon-card";


        /* =====================================
           CUPÓN UTILIZADO
        ===================================== */

        if (used) {

            card.innerHTML = `

                <div class="coupon-number">
                    CUPÓN ${String(coupon.id).padStart(2, "0")}
                </div>

                <div class="coupon-emoji">
                    ${coupon.emoji}
                </div>

                <h3 class="coupon-title">
                    ${coupon.title}
                </h3>

                <p class="coupon-description-text">
                    ${coupon.description}
                </p>

                <div class="used-badge">
                    ✓ CUPÓN UTILIZADO
                </div>

            `;


            return card;

        }


        /* =====================================
           CUPÓN DISPONIBLE
        ===================================== */

        card.innerHTML = `

            <div class="coupon-number">
                CUPÓN ${String(coupon.id).padStart(2, "0")}
            </div>

            <div class="coupon-emoji">
                ${coupon.emoji}
            </div>

            <h3 class="coupon-title">
                ${coupon.title}
            </h3>

            <p class="coupon-description-text">
                ${coupon.description}
            </p>

            <button
                class="use-coupon-button"
            >
                Usar cupón
            </button>

        `;


        /* =====================================
           BOTÓN USAR
        ===================================== */

        const button =
            card.querySelector(
                ".use-coupon-button"
            );


        button.addEventListener(
            "click",
            () => {

                confirmUseCoupon(
                    coupon.id
                );

            }
        );


        return card;

    }

    /* =========================================
   MOSTRAR CUPONES SECRETOS
========================================= */

function renderSecretCoupons() {

    if (!secretCouponsUnlocked) {

        secretCouponsSection.classList.remove(
            "unlocked"
        );

        return;
    }


    secretCouponsSection.classList.add(
        "unlocked"
    );


    secretCouponsContainer.innerHTML = "";


    const secretUsedCount =
        secretCoupons.filter(
            coupon =>
                usedCoupons.includes(
                    coupon.id
                )
        ).length;


    const secretAvailableCount =
        secretCoupons.length -
        secretUsedCount;


    secretCouponCounter.textContent =
        `${secretAvailableCount} disponibles • ` +
        `${secretUsedCount} usados`;


    secretCoupons.forEach(coupon => {

        const used =
            usedCoupons.includes(
                coupon.id
            );


        const card =
            createCouponCard(
                coupon,
                used
            );


        secretCouponsContainer.appendChild(
            card
        );

    });

}


    /* =========================================
   CONFIRMAR USO
========================================= */

/* =========================================
   CONFIRMAR USO
========================================= */

/* =========================================
   CONFIRMAR USO
========================================= */

function confirmUseCoupon(couponId) {

    /*
       Buscar el cupón tanto en los 21
       principales como en los 4 secretos.
    */

    const coupon =
        [...coupons, ...secretCoupons].find(
            coupon =>
                coupon.id === couponId
        );


    if (!coupon) {
        return;
    }


    /*
       Solo los cupones 1–21 tienen
       límite de 3 cada 24 horas.
    */

    const isMainCoupon =
        coupon.id <= 21;


    if (
        isMainCoupon &&
        !canUseMainCoupon()
    ) {

        limitModal.classList.add(
            "active"
        );

        return;

    }


    /*
       Abrir modal de confirmación.
    */

    openCouponModal(coupon);

}





/* =========================================
   UTILIZAR CUPÓN
========================================= */

function useCoupon(couponId) {

    /*
       Determinar si pertenece a los
       21 principales.
    */

    const isMainCoupon =
        couponId <= 21;


    /*
       Los 21 sí tienen límite.
    */

    if (
        isMainCoupon &&
        !canUseMainCoupon()
    ) {

        limitModal.classList.add(
            "active"
        );

        return;

    }


    /*
       Guardamos si los 21 terminaron
       ANTES de modificar el estado.
    */

    const wasAlreadyUnlocked =
        secretCouponsUnlocked;


    /*
       Marcar como utilizado.
    */

    usedCoupons.push(
        couponId
    );


    /*
       Guardar permanentemente.
    */

    localStorage.setItem(
        "usedCoupons",
        JSON.stringify(
            usedCoupons
        )
    );


    /*
       =====================================
       REGISTRO DE LAS 24 HORAS
       =====================================

       IMPORTANTE:
       Los secretos NO entran aquí.
    */

    if (isMainCoupon) {

        couponUsage.push({

            id: couponId,

            time: Date.now()

        });


        localStorage.setItem(
            "couponUsage",
            JSON.stringify(
                couponUsage
            )
        );

    }


    /*
       =====================================
       COMPROBAR SI TERMINÓ LOS 21
       =====================================
    */

    const allMainCouponsUsed =
        coupons.every(
            coupon =>
                usedCoupons.includes(
                    coupon.id
                )
        );


    /*
       Solo desbloquear en el momento
       exacto en que termina el 21.
    */

    const shouldRevealSecrets =
        allMainCouponsUsed &&
        !wasAlreadyUnlocked;


    if (shouldRevealSecrets) {

        secretCouponsUnlocked = true;


        localStorage.setItem(
            "secretCouponsUnlocked",
            "true"
        );

    }

    /* =====================================
   FINAL DE LOS 25 CUPONES
===================================== */

const allCouponsUsed =
    [...coupons, ...secretCoupons].every(
        coupon =>
            usedCoupons.includes(
                coupon.id
            )
    );


const shouldShowFinalMessage =
    couponId === 25 &&
    allCouponsUsed;


    /*
       =====================================
       ACTUALIZAR PANTALLA
       =====================================
    */

    renderCoupons();


    /*
       =====================================
       MOSTRAR REVELACIÓN
       =====================================
    */

    if (shouldRevealSecrets) {

        setTimeout(() => {

            secretUnlockModal.classList.add(
                "active"
            );

        }, 800);

    }


    /*
       =====================================
       MOSTRAR MENSAJE
       =====================================
    */

    setTimeout(() => {

        showCouponSuccess();

    }, 350);

    if (shouldShowFinalMessage) {

    setTimeout(() => {

        finalCouponModal.classList.add(
            "active"
        );

    }, 1200);

}

}

/* =========================================
   DESCUBRIR CUPONES SECRETOS
========================================= */

discoverSecretCoupons.addEventListener(
    "click",
    () => {

        secretUnlockModal.classList.remove(
            "active"
        );


        setTimeout(() => {

            secretCouponsSection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 400);

    }
);



/* =========================================
   CERRAR MODAL DE LÍMITE
========================================= */

closeLimitModal.addEventListener(
    "click",
    () => {

        limitModal.classList.remove(
            "active"
        );

    }
);


closeLimitButton.addEventListener(
    "click",
    () => {

        limitModal.classList.remove(
            "active"
        );

    }
);

/* =========================================
   CERRAR MENSAJE FINAL
========================================= */

closeFinalCoupon.addEventListener(
    "click",
    () => {

        finalCouponModal.classList.remove(
            "active"
        );

    }
);


/* =========================================
   INICIAR CUPONES
========================================= */

renderCoupons();

});