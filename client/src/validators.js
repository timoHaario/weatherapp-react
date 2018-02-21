const validTemperature = temperature => {
  return /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test(temperature)
  //Will match: 12 12.34 12. .12 -12 -12.34 -12. -.12 +12 +1.2 +1. +.5
}; 

export default {
	validTemperature: validTemperature
}
