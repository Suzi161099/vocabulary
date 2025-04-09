import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addVocabulary } from './vocabSlice'; 
import AddIcon from '@mui/icons-material/Add';


const AddVocabularyForm = () => {
  const dispatch = useDispatch();
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!word.trim()) newErrors.word = 'Vui lòng nhập từ vựng';
    if (!meaning.trim()) newErrors.meaning = 'Vui lòng nhập nghĩa của từ';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addVocabulary({ word, meaning }));
    setWord('');
    setMeaning('');
    setErrors({});
    navigate('/');
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 3 }}
    >
    <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
      <AddIcon color="primary" />
      Thêm từ mới
    </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Từ vựng"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          error={!!errors.word}
          helperText={errors.word}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Nghĩa của từ"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          error={!!errors.meaning}
          helperText={errors.meaning}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Thêm
        </Button>
      </Box>
    </Paper>
  );
};

export default AddVocabularyForm;
