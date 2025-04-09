import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';


const VocabularyStats = () => {
  const vocabList = useSelector((state) => state.vocabulary.vocabList);

  const [stats, setStats] = useState({
    total: 0,
    learned: 0,
    unlearned: 0,
  });

  useEffect(() => {
    const total = vocabList.length;
    const learned = vocabList.filter((vocab) => vocab.isLearned).length;
    const unlearned = total - learned;

    setStats({ total, learned, unlearned });
  }, [vocabList]);

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent>
      <Typography variant="h5" gutterBottom display="flex" alignItems="center" gap={1}>
        <BarChartIcon color="primary" />
        Thống kê từ vựng
      </Typography>


        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" color="primary">Tổng</Typography>
            <Typography variant="body1">{stats.total}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="success.main">Đã học</Typography>
            <Typography variant="body1">{stats.learned}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="error">Chưa học</Typography>
            <Typography variant="body1">{stats.unlearned}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VocabularyStats;
