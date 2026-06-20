const $ = id => document.getElementById(id);

['start', 'end', 'bpm'].forEach(id => $(id).addEventListener('input', calc));

function calc() {
  const start = parseFloat($('start').value);
  const end   = parseFloat($('end').value);
  const bpm   = parseFloat($('bpm').value);
  const sr    = 44100;

  $('error').textContent = '';

  if (isNaN(start) || isNaN(end) || isNaN(bpm) || bpm <= 0 || end <= start) {
    $('error').textContent = end <= start ? 'End must be greater than Start.' : 'Enter valid values.';
    return;
  }

  const duration       = end - start;
  const samplesPerBeat = (60 / bpm) * sr;
  const exactBeats     = duration / samplesPerBeat;
  const completeBeats  = Math.floor(exactBeats);
  const remainder      = Math.round(duration - completeBeats * samplesPerBeat);
  const toNextBeat     = Math.round(samplesPerBeat - remainder);

  $('out-beats').innerHTML = `${completeBeats}<span>beats</span>`;

  if (remainder === 0) {
    $('row-remove').style.display = 'none';
    $('row-add').style.display    = 'none';
  } else {
    $('row-remove').style.display = '';
    $('row-add').style.display    = '';
    $('out-remove').innerHTML = `${remainder.toLocaleString()}<span>samples</span>`;
    $('out-add').innerHTML    = `${toNextBeat.toLocaleString()}<span>samples</span>`;
  }
}

calc();
