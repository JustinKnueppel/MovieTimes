interface HTMLOptions {
    id?: string;
}

function getCheckedTheatres(): string[] {
    let checkedTheatres: string[] = [];

    for (let theatre of AMCtheatres) {
        if (
            (<HTMLInputElement>(
                document.querySelector(
                    `#theatre-options input[name="${theatre.name}"]`
                )
            )).checked
        ) {
            checkedTheatres.push(theatre.id);
        }
    }

    return checkedTheatres;
}

/**
 * Return a date object representing the time limit inside the given element.
 * @param timeElem div containing the time selectors.
 */
function parseTimeInput(timeElem: HTMLElement): Date {
    let hourDD: HTMLSelectElement = timeElem.querySelector(
        'select[name="hours"]'
    );
    let hour = parseInt(hourDD.options[hourDD.selectedIndex].value);

    let ampmDD: HTMLSelectElement = timeElem.querySelector(
        'select[name="ampm"]'
    );
    let ampm = ampmDD.options[ampmDD.selectedIndex].value;

    if (ampm === 'pm') {
        hour += 12;
    }

    let minuteDD: HTMLSelectElement = timeElem.querySelector(
        'select[name="minutes"]'
    );
    let minute = parseInt(minuteDD.options[minuteDD.selectedIndex].value);

    let time = new Date();
    time.setHours(hour);
    time.setMinutes(minute);
    time.setSeconds(0);

    return time;
}

/**
 * Get the time options that were filled in.
 */
function getTimeConstraints() {
    let timeStartElem = document.getElementById('time-start');
    let timeEndElem = document.getElementById('time-end');

    let startTime = parseTimeInput(timeStartElem);
    let endTime = parseTimeInput(timeEndElem);

    return { start: startTime, end: endTime };
}

// Control elements of page
/**
 * Document already loaded from loaddata script.
 */
document.addEventListener('click', function(event) {
    if (!(event.target instanceof Element)) {
        console.log('Event not a target of element');
        return;
    }

    /*
     * Deal with filtering.
     */
    if (event.target.matches('#submit-filter')) {
        let checkedTheatres: string[] = getCheckedTheatres();
        let times = getTimeConstraints();
        let data = filterData(checkedTheatres, times.start, times.end);
        loadData(data);
    }
});
