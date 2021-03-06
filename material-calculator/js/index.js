;
document.addEventListener('DOMContentLoaded', function() {
    function $(query) {
        return document.querySelector(query);
    }

    var material = {
        densityInput: $('#density_input'),
        
        cuboidLengthInput: $('#cuboid_length_input'),
        cuboidWidthInput: $('#cuboid_width_input'),
        cuboidHeightInput: $('#cuboid_height_input'),
        cuboidResultLabel: $('#cuboid_result_label'),
        cuboidCalBtn: $('#cuboid_cal_btn'),

        tubeLengthInput: $('#tube_length_input'),
        tubeOuterDiameterInput: $('#tube_outer_diameter_input'),
        tubeThickInput: $('#tube_thick_input'),
        tubeResultLabel: $("#tube_result_label"),
        tubeCalBtn: $('#tube_cal_btn'),

        cylinderLengthInput: $('#cylinder_length_input'),
        cylinderDiameterInput: $('#cylinder_diameter_input'),
        cylinderResultLabel: $("#cylinder_result_label"),
        cylinderCalBtn: $('#cylinder_cal_btn'),

        PI: 3.1415926,

        fixFloat: function(f) {
            return f;
        },

        calculateMass: function(density, volumn) {
            return density * volumn;
        },

        calCuboidVolumn: function(length, width, height) {
            return length * width * height * 1e-9;
        },

        calTubeVolumn: function(length, innerRadius, outerRadius) {
            return length * (outerRadius*outerRadius - innerRadius*innerRadius) * material.PI * 1e-9;
        },

        calCylinderVolumn: function(length, radius) {
            return length * radius * radius * material.PI * 1e-9;
        },

        checkNaN: function() {
            console.log(arguments);
            for (var i in arguments) {
                if (isNaN(arguments[i])) {
                    return false;
                }
            }
            return true;
        },

        calCuboid: function() {
            console.log('<start calculating cuboid>');
            var density = parseFloat(material.densityInput.value);
            var length = parseFloat(material.cuboidLengthInput.value);
            var width = parseFloat(material.cuboidWidthInput.value);
            var height = parseFloat(material.cuboidHeightInput.value);
            console.log('[density] ' + density);
            console.log('[length] ' + length);
            console.log('[width] ' + width);
            console.log('[height] ' + height);

            if (!material.checkNaN(density, length, width, height)) {
                material.cuboidResultLabel.innerHTML = '输入有误';
                return;
            }
            var mass = material.calculateMass(density*1e3, material.calCuboidVolumn(length, width, height));
            console.log('[mass] ' + mass);
            material.cuboidResultLabel.innerHTML = material.fixFloat(mass);
        },

        calTube: function() {
            console.log('<start calculating tube>');
            var density = parseFloat(material.densityInput.value);
            var length = parseFloat(material.tubeLengthInput.value);
            var thick = parseFloat(material.tubeThickInput.value);
            var outerDiameter = parseFloat(material.tubeOuterDiameterInput.value);
            console.log('[density] ' + density);
            console.log('[length] ' + length);
            console.log('[thick] ' + thick);
            console.log('[outerDiameter] ' + outerDiameter);

            if (!material.checkNaN(density, length, outerDiameter/2 - thick, outerDiameter/2)) {
                material.tubeResultLabel.innerHTML = '输入有误';
                return;
            }
            var mass = material.calculateMass(density*1e3, material.calTubeVolumn(length, outerDiameter/2-thick, outerDiameter/2));
            console.log('[mass] ' + mass);
            material.tubeResultLabel.innerHTML = material.fixFloat(mass);
        },

        calCylinder: function() {
            console.log('<start calculating cylinder>');
            var density = parseFloat(material.densityInput.value);
            var length = parseFloat(material.cylinderLengthInput.value);
            var diameter = parseFloat(material.cylinderDiameterInput.value);
            console.log('[density] ' + density);
            console.log('[length] ' + length);
            console.log('[diameter] ' + diameter);

            if (!material.checkNaN(density, length, diameter/2)) {
                material.cylinderResultLabel.innerHTML = '输入有误';
                return;
            }
            var mass = material.calculateMass(density*1e3, material.calCylinderVolumn(length, diameter/2));
            console.log('[mass] ' + mass);
            material.cylinderResultLabel.innerHTML = material.fixFloat(mass);
        },

        onCuboidCalBtnClick: function(e) {
            e.preventDefault();
            material.calCuboid();
            return false;
        },

        onTubeCalBtnClick: function(e) {
            e.preventDefault();
            material.calTube();
            return false;
        },

        onCylinderCalBtnClick: function(e) {
            e.preventDefault();
            material.calCylinder();
            return false;
        },

        onDensityInputChange: function(e) {
            material.calCuboid();
            material.calTube();
            material.calCylinder();
        },

        onCuboidInputChange: function(e) {
            material.calCuboid();
        },

        onTubeInputChange: function(e) {
            material.calTube();
        },

        onCylinderInputChange: function(e) {
            material.calCylinder();
        },

        init: function() {
            material.cuboidCalBtn.addEventListener('touchend', material.onCuboidCalBtnClick);
            material.tubeCalBtn.addEventListener('touchend', material.onTubeCalBtnClick);
            material.cylinderCalBtn.addEventListener('touchend', material.onCylinderCalBtnClick);
            
            material.densityInput.addEventListener('input', material.onDensityInputChange);
            material.cuboidLengthInput.addEventListener('input', material.onCuboidInputChange);
            material.cuboidWidthInput.addEventListener('input', material.onCuboidInputChange);
            material.cuboidHeightInput.addEventListener('input', material.onCuboidInputChange);
            material.tubeLengthInput.addEventListener('input', material.onTubeInputChange);
            material.tubeThickInput.addEventListener('input', material.onTubeInputChange);
            material.tubeOuterDiameterInput.addEventListener('input', material.onTubeInputChange);
            material.cylinderLengthInput.addEventListener('input', material.onCylinderInputChange);
            material.cylinderDiameterInput.addEventListener('input', material.onCylinderInputChange);
        }
    }

    material.init();
});
