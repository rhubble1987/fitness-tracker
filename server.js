const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 8088;

const Workout = require("./models/workoutModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/api/workouts', (req,res) => {
    Workout.find({})
        .then(Workouts => {
            res.json(Workouts);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

app.put('/api/workouts/:id', (req,res) => {
        Workout.updateOne({_id: req.params.id},
            {$push: {
                exercises: {
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration,
                    distance: req.body.distance,
                    weight: req.body.weight,
                    sets: req.body.sets,
                    reps: req.body.reps
                }
            }
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get('/api/workouts/range', (req,res) => {
    Workout.find({}).sort({date: 'desc'}).limit(7)
        .then(Workouts => {
            res.json(Workouts);
        })
        .catch(err => {
            res.json(err);
        });

});


app.get('/exercise', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', './exercise.html'));
});

app.get('/exercise?id=', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', './exercise.html' + req.params.id));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
