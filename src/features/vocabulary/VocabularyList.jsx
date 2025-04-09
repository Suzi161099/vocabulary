import { useThemeContext } from '../theme/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import BarChartIcon from '@mui/icons-material/BarChart';


import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLearned, deleteVocabulary } from '../../redux/vocabularySlice';

const VocabularyList = () => {
  const vocabList = useSelector((state) => state.vocabulary.vocabList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { mode, toggleTheme } = useThemeContext();

  const handleToggle = (id) => {
    dispatch(toggleLearned(id));
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa từ này không?')) {
      dispatch(deleteVocabulary(id));
    }
  };

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  const filteredList = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return vocabList
      .filter(
        (vocab) =>
          vocab.word.toLowerCase().includes(lowerTerm) ||
          vocab.meaning.toLowerCase().includes(lowerTerm)
      )
      .filter((vocab) => {
        if (filter === 'learned') return vocab.isLearned;
        if (filter === 'unlearned') return !vocab.isLearned;
        return true;
      });
  }, [searchTerm, vocabList, filter]);

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4, boxShadow: 3 }}>
      <CardContent>

        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom display="flex" alignItems="center" gap={1}>
          <MenuBookIcon color="primary" />
          Danh sách từ vựng
        </Typography>

          <IconButton onClick={toggleTheme}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>

        <TextField
            label="Tìm kiếm từ vựng"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
              },
              '& .MuiInputLabel-root': {
                borderRadius: '30px',
              },
            }}
          />


        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          fullWidth
          size="small"
          sx={{ my: 2 }}
        >
          <ToggleButton value="all">Tất cả</ToggleButton>
          <ToggleButton value="learned">Đã học</ToggleButton>
          <ToggleButton value="unlearned">Chưa học</ToggleButton>
        </ToggleButtonGroup>

        <List>
          {filteredList.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Không tìm thấy kết quả.
            </Typography>
          ) : (
            filteredList.map((vocab, index) => (
              <React.Fragment key={vocab.id}>
                <ListItem
                  secondaryAction={
                    <>
                      <Checkbox
                        edge="end"
                        checked={vocab.isLearned}
                        onChange={() => handleToggle(vocab.id)}
                      />
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(vocab.id)}
                        color="error"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={<span style={{ fontWeight: 'bold' }}>{vocab.word}</span>}
                    secondary={vocab.meaning}
                  />
                </ListItem>
                {index < filteredList.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/addVocabulary')}
            startIcon={<AddIcon />}
          >
            Thêm từ mới
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate('/quiz')}
            startIcon={<ShuffleIcon />}
          >
            Quiz ngẫu nhiên
          </Button>

          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={() => navigate('/statistics')}
            startIcon={<BarChartIcon />}
          >
            Xem thống kê
          </Button>

        </Box>
      </CardContent>
    </Card>
  );
};

export default VocabularyList;
