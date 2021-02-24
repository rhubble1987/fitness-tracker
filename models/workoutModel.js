const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
        type: {
            type: String,
            trim: true,
            required: 'You must select an exercise type.',
        },
        name: {
            type: String,
            trim: true,
            required: 'You must provide an excercise name.',
        },
        duration: {
            type: Number,
            required: 'You must enter the exercise duration.',
        },
        distance: {
            type: Number,
            required: isRequiredCardio()
        },
        weight: {
            type: Number,
            required: isRequiredResistance()
        },
        sets: {
            type: Number,
            required: isRequiredResistance()
        },
        reps: {
            type: Number,
            required: isRequiredResistance()
        }
    }    
    ],
});

function isRequiredResistance() {
    if (this.type == 'resistance') {
        return true;
    } else {
        return false;
    }
}

function isRequiredCardio() {
    if (this.type == 'cardio') {
        return true;
    } else {
        return false;
    }
}


        

    


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;