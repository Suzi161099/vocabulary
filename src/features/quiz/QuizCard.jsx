import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import PsychologyIcon from '@mui/icons-material/Psychology';

const QuizCard = () => {
  const vocabList = useSelector(state => state.vocabulary.vocabList);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const generateQuiz = () => {
    const randomWord = vocabList[Math.floor(Math.random() * vocabList.length)];
    const allMeanings = vocabList
      .filter(v => v.id !== randomWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(v => v.meaning);

    const mixedOptions = [...allMeanings, randomWord.meaning].sort(() => 0.5 - Math.random());

    setCurrentWord(randomWord);
    setOptions(mixedOptions);
    setSelected(null);
    setResult(null);
  };

  useEffect(() => {
    if (vocabList.length >= 4) {
      generateQuiz();
    }
  }, [vocabList]);

  const handleAnswer = (option) => {
    setSelected(option);
    setResult(option === currentWord.meaning);
  };

  if (!currentWord) return <Typography>Không đủ dữ liệu để tạo quiz!</Typography>;

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom display="flex" alignItems="center" gap={1}>
          <PsychologyIcon color="primary" />
          Nghĩa của từ: <strong>{currentWord.word}</strong>
        </Typography>


        <Stack spacing={2} mt={2}>
          {options.map((option, idx) => (
            <Button
              key={idx}
              variant={selected === option ? 'contained' : 'outlined'}
              color={
                selected === option
                  ? option === currentWord.meaning
                    ? 'success'
                    : 'error'
                  : 'primary'
              }
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
            >
              {option}
            </Button>
          ))}
        </Stack>

        {selected && (
          <Alert severity={result ? 'success' : 'error'} sx={{ mt: 3 }}>
            <Box display="flex" alignItems="center">
              {result ? (
                'Chính xác!'
              ) : (
                <>
                  Sai rồi! Đáp án đúng là: <strong>{currentWord.meaning}</strong>
                </>
              )}
            </Box>
          </Alert>
        )}
      <Box mt={3}>
        <Button
          variant="contained"
          onClick={generateQuiz}
          fullWidth
          startIcon={<ReplayIcon />}
        >
          Câu hỏi tiếp theo
        </Button>
      </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
