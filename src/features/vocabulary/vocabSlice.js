import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vocabList: [
    { id: 1, word: 'Apple', meaning: 'Quả táo', isLearned: false },
    { id: 2, word: 'Run', meaning: 'Chạy', isLearned: false },
    { id: 3, word: 'Beautiful', meaning: 'Đẹp', isLearned: false },
    { id: 4, word: 'Dog', meaning: 'Con chó', isLearned: false },
    { id: 5, word: 'Swim', meaning: 'Bơi', isLearned: false },
    { id: 6, word: 'Happy', meaning: 'Hạnh phúc', isLearned: false },
    { id: 7, word: 'Book', meaning: 'Cuốn sách', isLearned: false },
    { id: 8, word: 'Write', meaning: 'Viết', isLearned: false },
    { id: 9, word: 'Strong', meaning: 'Mạnh mẽ', isLearned: false },
    { id: 10, word: 'Cat', meaning: 'Con mèo', isLearned: false },
    { id: 11, word: 'Eat', meaning: 'Ăn', isLearned: false },
    { id: 12, word: 'Fast', meaning: 'Nhanh', isLearned: false },
    { id: 13, word: 'Tree', meaning: 'Cái cây', isLearned: false },
    { id: 14, word: 'Jump', meaning: 'Nhảy', isLearned: false },
    { id: 15, word: 'Cold', meaning: 'Lạnh', isLearned: false },
  ],
};

let nextId = 3;

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    addVocabulary: (state, action) => {
      const { word, meaning } = action.payload;
      state.vocabList.push({
        id: nextId++,
        word,
        meaning,
        isLearned: false,
      });
    },
    toggleLearned: (state, action) => {
      const vocab = state.vocabList.find(v => v.id === action.payload);
      if (vocab) vocab.isLearned = !vocab.isLearned;
    },
  },
});

export const { addVocabulary, toggleLearned } = vocabularySlice.actions;
export default vocabularySlice.reducer;
