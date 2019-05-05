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
    let optionSpace = document.getElementById('option-space');

    let options = document.createElement('div');
    options.setAttribute('id', 'theatre-list');

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

function showTimeOptions() {
    let optionSpace = document.getElementById('option-space');

    let options = document.createElement('div');
    options.setAttribute('id', 'time-options');

    let startTime = document.createElement('input');
    startTime.setAttribute('id', 'time-start');
    startTime.setAttribute('type', 'time');

    let note = document.createElement('span')
    note.setAttribute('class', 'note');
    note.innerText = 'Please put start and end time';

    option.appendChild(startTime);
    option.appendChild(note);
    optionSpace.appendChild(options);
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
    if(event.target.matches('#theatre-list input')) {
        filter({field: 'theatre', theatre: event.target.getAttribute('value'), checked: event.target.checked});
    }

    /*
     * Deal with time options.
     */
    if(event.target.matches('.filter-option[name="time"]')) {
        showTimeOptions();
    }
})};