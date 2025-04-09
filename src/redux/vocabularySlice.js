
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vocabList: JSON.parse(localStorage.getItem('vocabList')) || [
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

const vocabularySlice = createSlice({
    name: 'vocabulary',
    initialState,
    reducers: {
      toggleLearned(state, action) {
        const id = action.payload;
        const word = state.vocabList.find((item) => item.id === id);
        if (word) word.isLearned = !word.isLearned;
        localStorage.setItem('vocabList', JSON.stringify(state.vocabList));
      },
      addVocabulary(state, action) {
        state.vocabList.push(action.payload);
        localStorage.setItem('vocabList', JSON.stringify(state.vocabList));
      },
      setVocabList(state, action) {
        state.vocabList = action.payload;
        localStorage.setItem('vocabList', JSON.stringify(state.vocabList));
      },
      deleteVocabulary(state, action) {
        state.vocabList = state.vocabList.filter((v) => v.id !== action.payload);
        localStorage.setItem('vocabList', JSON.stringify(state.vocabList));
      },
    },
  });
  

export const { toggleLearned, addVocabulary, setVocabList,deleteVocabulary } = vocabularySlice.actions;
export default vocabularySlice.reducer;
