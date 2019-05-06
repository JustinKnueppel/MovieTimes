const AMCtheatres = [{id: 'amc-lennox-town-center-24', name: 'AMC Lennox'}, {id: 'amc-dublin-village-18', name: 'AMC Dublin Village'}, {id: 'amc-columbus-10', name: 'AMC Hilliard'}];

function filterTheatre(theatre, checked) {
    console.log(`Now ${checked ? 'showing': 'hiding'} ${theatre}`);
}

function filterTime(start, end) {
    console.log(`Now showing movies between ${start} and ${end}`);
}
function filter(data) {
    switch(data.field) {
        case 'theatre':
            filterTheatre(data.theatre, data.checked);
            break;
        case 'time':
            filterTime(data.start, data.end);
    }
}

function showTheatreOptions() {
    if (document.getElementById('theatre-options')) {
        return;
    }
    let optionSpace = document.getElementById('option-space');

    let options = document.createElement('div');
    options.setAttribute('id', 'theatre-options');

    optionSpace.appendChild(options);

    for (theatre of AMCtheatres) {
        let node = document.createElement('input');
        node.setAttribute('type', 'checkbox');
        node.setAttribute('value', theatre['id']);
        node.setAttribute('name', theatre['name']);

        options.appendChild(node);
        options.append(theatre['name']);
    }
}

function getCurrentHour() {
    let date = new Date();
    let hour = date.getHours() + 1;

    let pm = false;
    if (hour >= 12 && hour < 24) {
        pm = true;
    }

    if (hour > 12) {
        hour -= 12;
    }

    return [hour, pm];
}
function appendTimeUI(elem, opts) {
    let time = document.createElement('div');

    for (let [key, value] of Object.entries(opts)) {
        time.setAttribute(key, value);
    }

    let hours = document.createElement('select');
    hours.setAttribute('name', 'hours');
    let [currentHour, ispm] = getCurrentHour();
    for (let i = 1; i <= 12; i++) {
        let hour = document.createElement('option');
        hour.setAttribute('value', i);
        if (i === currentHour) {
            hour.setAttribute('selected', 'selected');
        }
        hour.innerText = i;
        hours.appendChild(hour);
    }
    time.appendChild(hours);

    time.append(' : ');

    let minutes = document.createElement('select');
    minutes.setAttribute('name', 'minutes');
    for (let i of [0, 15, 30, 45]) {
        let minute = document.createElement('option');
        minute.setAttribute('value', i);
        minute.innerText = i;
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

function parseTimeInput(timeElem) {
    let hourDD = timeElem.querySelector('select[name="hours"');
    let hour = hourDD.options[hourDD.selectedIndex].value;

    let ampmDD = timeElem.querySelector('select[name="ampm"');
    let ampm = ampmDD.options[ampmDD.selectedIndex].value;

    if (ampm === 'pm') {
        hour += 12;
    }

    let minuteDD = timeElem.querySelector('select[name="minutes"');
    let minute = minuteDD.options[minuteDD.selectedIndex].value;

    let time = new Date();
    time.setHours(hour);
    time.setMinutes(minute);
    time.setSeconds(0);

    return time;
}

function getTimeConstraints() {
    let timeStartElem = document.getElementById('time-start');
    let timeEndElem = document.getElementById('time-end');

    let startTime = parseTimeInput(timeStartElem);
    let endTime = parseTimeInput(timeEndElem);
    
    return {start: startTime, end: endTime};
}

function showTimeOptions() {
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
window.onload = () => {
document.addEventListener('click', function(event) {
    /*
     * Deal with theatre options.
     */
    if(event.target.matches('.filter-option[name="theatres"]')) {
        showTheatreOptions();
    }
    if(event.target.matches('#theatre-options input')) {
        filter({field: 'theatre', theatre: event.target.getAttribute('value'), checked: event.target.checked});
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
})};