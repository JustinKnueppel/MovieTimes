interface HTMLOptions {
    id?: string,
}

/**
 * Filter the movies based on the theatre.
 * @param {string} theatre Unique theatre name to be toggled.
 * @param {boolean} checked Indicator for whether the movie theatre should be shown or not.
 */
function filterTheatre(theatreID: string, checked: boolean) {
    console.log(`Now ${checked ? 'showing': 'hiding'} ${theatreID}`);
    let data: TheatresData = filterDataByTheatre(['amc-lennox-town-center-24']);
    loadData(data);
}
/**
 * Filter the movies based on when their showtime begins.
 * @param {Date} start The earliest movie time to be shown.
 * @param {Date} end The latest movie time to be shown.
 */
function filterTime(start: Date, end: Date) {
    console.log(`Now showing movies between ${start} and ${end}`);
}

/**
 * Display theatre options to the user.
 */
function showTheatreOptions() {
    // Do not load more than once
    if (document.getElementById('theatre-options')) {
        return;
    }
    let optionSpace = document.getElementById('option-space');

    let options = document.createElement('div');
    options.setAttribute('id', 'theatre-options');

    optionSpace.appendChild(options);

    for (let theatre of AMCtheatres) {
        let node = document.createElement('input');
        node.setAttribute('type', 'checkbox');
        node.setAttribute('value', theatre['id']);
        node.setAttribute('name', theatre['name']);

        options.appendChild(node);
        options.append(theatre['name']);
    }
}
/**
 * Return the current hour in 12 hour format along with an am/pm indicator.
 */
function getCurrentHour() {
    let date = new Date();
    let hour = date.getHours() + 1;

    let ispm = false;
    if (hour >= 12 && hour < 24) {
        ispm = true;
    }

    if (hour > 12) {
        hour -= 12;
    }

    return [hour, ispm];
}
/**
 * Append as a child to the given element a time UI with the given attributes.
 * @param {container element} elem to be the parent element of the time UI.
 * @param {Object} opts attributes to be set for the time UI.
 */
function appendTimeUI(elem: HTMLElement, opts: HTMLOptions) {
    let time = document.createElement('div');

    for (let [key, value] of Object.entries(opts)) {
        time.setAttribute(key, value);
    }

    let hours = document.createElement('select');
    hours.setAttribute('name', 'hours');
    let [currentHour, ispm] = getCurrentHour();
    for (let i = 1; i <= 12; i++) {
        let hour = document.createElement('option');
        hour.setAttribute('value', i.toString());
        if (i === currentHour) {
            hour.setAttribute('selected', 'selected');
        }
        hour.innerText = i.toString();
        hours.appendChild(hour);
    }
    time.appendChild(hours);

    // Give slight formatting
    time.append(' : ');

    let minutes = document.createElement('select');
    minutes.setAttribute('name', 'minutes');
    for (let i of [0, 15, 30, 45]) {
        let minute = document.createElement('option');
        minute.setAttribute('value', i.toString());
        minute.innerText = i.toString();
        minutes.appendChild(minute);
    }
    time.appendChild(minutes);

    let ampm = document.createElement('select');
    ampm.setAttribute('name', 'ampm');

    let am = document.createElement('option');
    am.setAttribute('value', 'am');
    am.innerText = 'am';
    ampm.appendChild(am);

    let pm = document.createElement('option');
    pm.setAttribute('value', 'pm');
    pm.innerText = 'pm';
    ampm.appendChild(pm);

    if (ispm) {
        pm.setAttribute('selected', 'selected');
    } else {
        am.setAttribute('selected', 'selected');
    }

    time.appendChild(ampm);

    elem.appendChild(time);
}
/**
 * Return a date object representing the time limit inside the given element.
 * @param timeElem div containing the time selectors.
 */
function parseTimeInput(timeElem: HTMLElement): Date {
    let hourDD: HTMLSelectElement = timeElem.querySelector('select[name="hours"]');
    let hour = parseInt(hourDD.options[hourDD.selectedIndex].value);

    let ampmDD: HTMLSelectElement = timeElem.querySelector('select[name="ampm"]');
    let ampm = ampmDD.options[ampmDD.selectedIndex].value;

    if (ampm === 'pm') {
        hour += 12;
    }

    let minuteDD: HTMLSelectElement = timeElem.querySelector('select[name="minutes"]');
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
    
    return {start: startTime, end: endTime};
}

/**
 * Display time filtering options.
 */
function showTimeOptions() {
    // Only load once
    if (document.getElementById('time-options')) {
        return;
    }
    let optionSpace = document.getElementById('option-space');

    let options = document.createElement('div');
    options.setAttribute('id', 'time-options');

    optionSpace.appendChild(options);

    let note = document.createElement('span')
    note.setAttribute('class', 'note');
    note.innerText = 'Please put start and end time';

    options.appendChild(note);

    appendTimeUI(options, {'id': 'time-start'});
    appendTimeUI(options, {'id': 'time-end'});

    let submit = document.createElement('button');
    submit.setAttribute('type', 'button');
    submit.setAttribute('class', 'submit-btn');
    submit.setAttribute('name', 'submit-time');
    submit.innerText = 'filter';

    options.appendChild(submit);
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
     * Deal with theatre options.
     */
    if(event.target.matches('.filter-option[name="theatres"]')) {
        showTheatreOptions();
    }
    if(event.target.matches('#theatre-options input')) {
        if (event.target instanceof HTMLInputElement) {
            filterTheatre(event.target.getAttribute('value'), event.target.checked);
        } else {
            console.log('Matched for filter theatre but not an input element');
            return;
        }
    }

    /*
     * Deal with time options.
     */
    if(event.target.matches('.filter-option[name="time"]')) {
        showTimeOptions();
    }

    if(event.target.matches('button[name="submit-time"]')) {
        let times = getTimeConstraints();
        filterTime(times.start, times.end);
    }
});