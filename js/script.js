document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".projects-track");

    const previousButton =
        document.getElementById("previous-project");

    const nextButton =
        document.getElementById("next-project");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    let visibleCards = [];
    let currentIndex = 0;


    // ==========================================
    // GET ALL PROJECT CARDS
    // ==========================================

    function getAllCards() {

        return Array.from(
            document.querySelectorAll(".project-card")
        );

    }


    // ==========================================
    // GET VISIBLE PROJECT CARDS
    // ==========================================

    function updateVisibleCards() {

        visibleCards = getAllCards().filter(card => {

            return window.getComputedStyle(card).display !== "none";

        });

    }


    // ==========================================
    // UPDATE CAROUSEL
    // ==========================================

    function updateCarousel() {

        updateVisibleCards();

        if (visibleCards.length === 0) {

            track.style.transform = "translateX(0px)";

            previousButton.disabled = true;
            nextButton.disabled = true;

            return;

        }


        // Keep index inside valid range

        if (currentIndex < 0) {
            currentIndex = 0;
        }

        if (currentIndex >= visibleCards.length) {
            currentIndex = visibleCards.length - 1;
        }


        const currentCard = visibleCards[currentIndex];


        /*
        Move carousel based on the actual position
        of the selected visible project card.
        */

        track.style.transform =
            `translateX(-${currentCard.offsetLeft}px)`;


        // Update navigation button states

        previousButton.disabled =
            currentIndex === 0;

        nextButton.disabled =
            currentIndex === visibleCards.length - 1;

    }


    // ==========================================
    // NEXT PROJECT
    // ==========================================

    nextButton.addEventListener("click", function () {

        updateVisibleCards();

        if (currentIndex < visibleCards.length - 1) {

            currentIndex++;

            updateCarousel();

        }

    });


    // ==========================================
    // PREVIOUS PROJECT
    // ==========================================

    previousButton.addEventListener("click", function () {

        updateVisibleCards();

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    // ==========================================
    // PROJECT FILTERS
    // ==========================================

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            const selectedFilter =
                button.dataset.filter.toLowerCase();


            // Remove active state from all filters

            filterButtons.forEach(filterButton => {

                filterButton.classList.remove("active");

            });


            // Activate selected filter

            button.classList.add("active");


            // ==========================================
            // SHOW / HIDE PROJECT CARDS
            // ==========================================

            getAllCards().forEach(card => {

                const projectTools = card.dataset.tools
                    .toLowerCase()
                    .split(",")
                    .map(tool => tool.trim());


                const matches =
                    selectedFilter === "all" ||
                    projectTools.includes(selectedFilter);


                card.style.display =
                    matches ? "grid" : "none";

            });


            // ==========================================
            // RETURN TO FIRST MATCHING PROJECT
            // ==========================================

            currentIndex = 0;


            /*
            Wait for browser layout to update
            before calculating project position.
            */

            requestAnimationFrame(function () {

                updateCarousel();

            });

        });

    });


    // ==========================================
    // WINDOW RESIZE
    // ==========================================

    window.addEventListener("resize", function () {

        updateCarousel();

    });


    // ==========================================
    // INITIAL POSITION
    // ==========================================

    updateCarousel();

});
