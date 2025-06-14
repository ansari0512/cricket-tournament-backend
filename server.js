const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Team Schema
const teamSchema = new mongoose.Schema({
  teamName: String,
  captainName: String,
  players: [{
    srNo: Number,
    playerName: String,
    playerType: String,
    battingStyle: String,
    bowlingStyle: String,
    photo: String
  }]
});

const Team = mongoose.model('Team', teamSchema);

// API to Register Team
app.post('/api/teams', async (req, res) => {
  try {
    const teamData = req.body;
    const team = new Team(teamData);
    await team.save();
    res.json({ message: 'Team registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering team' });
  }
});

// API to Fetch Teams
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
