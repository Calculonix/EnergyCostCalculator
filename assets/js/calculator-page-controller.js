export function createCalculatorPageController({ form, fields, sliders, onChange }) {
  function syncSlider(name) {
    const value = Number(fields[name].value);
    if (Number.isFinite(value) && value >= Number(sliders[name].min) && value <= Number(sliders[name].max)) sliders[name].value = value;
  }

  function updateFromSlider(name) {
    fields[name].value = sliders[name].value;
    onChange();
  }

  function bind() {
    form.addEventListener('input', (event) => {
      const fieldName = Object.entries(fields).find(([, field]) => field === event.target)?.[0];
      if (fieldName && sliders[fieldName]) syncSlider(fieldName);
      onChange();
    });
    Object.entries(sliders).forEach(([name, slider]) => slider.addEventListener('input', () => updateFromSlider(name)));
  }

  return { bind, syncSlider, updateFromSlider };
}