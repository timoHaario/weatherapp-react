const validTemperature = temperature => {
  return /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test(temperature) && temperature < 100 && temperature > -100
  //Will match: 12 12.34 12. .12 -12 -12.34 -12. -.12 +12 +1.2 +1. +.5
}; 

export default {
	validTemperature: validTemperature
}
