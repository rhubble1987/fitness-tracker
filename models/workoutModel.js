const mongoose = require("mongoose");
const moment = required('moment');
const numeral = required('numeral');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    excerciseType: {
        type: String,
        trim: true,
        required: 'You must select an exercise type.',
        validate: [(exerciseType) => exerciseType === 'Resistance' || excerciseType === 'Cardio', 'Type can only be resistance or cardio.']
    },
    name: {
        type: String,
        trim: true,
        required: 'You must provide an excercise name.',
        validate: [({length}) => length <= 50, 'Workout name can only be 50 characters in length.']
    },
    duration: {
        type: Number,
        required: 'You must enter the workout duration.',
        validate: [(duration) => duration === moment(duration).format('mm:ss'),'Duration must be formatted as mm:ss.']
    },
    distance: {
        type: Number,
        required: [(exerciseType) => exerciseType === 'Cardio', 'You must enter the distance for your workout.'],
        validate: [(distance) => distance === numeral(distance).format('00.00')]

    },
    weight: {
        type: Number,
        required: [(excerciseType) => excerciseType === "Resistance", 'You must enter the weight.']
    },
    sets: {
        type: Number,
        required: [(excerciseType) => excerciseType === "Resistance", 'You must enter the number of sets.']
    },
    reps: {
        type: Number,
        required: [(excerciseType) => excerciseType === "Resistance", 'You must enter the number of reps.']
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;