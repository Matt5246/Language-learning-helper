import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { UpdateSubsObjectPayload } from "../../types"

export interface SubsObject { 
  id: string;
  learned: boolean;
  hard: boolean;
  time: string;
  line: string;
}
export interface Subtitle {
    id?: string;
    title: string;
    content: SubsObject[];
    date?: string;
}

export interface SubtitlesState {
  subtitles: Subtitle[];
  selectedSubtitles: string | null;
}

const initialState: SubtitlesState = {
  subtitles: [
  ],
  selectedSubtitles: null,
};
  


const subtitles = createSlice({
  name: "subtitles",
  initialState,
  reducers: {
    subtitlesAdded: {
      reducer(state, action: PayloadAction<Subtitle[]>) {
        action.payload.forEach(subtitle => {
          state.subtitles.push(subtitle);
        });
      },
      prepare(subtitles: Subtitle[]) {
        const preparedSubtitles = subtitles.map(subtitle => {
          if (!subtitle.id) {
            subtitle.id = nanoid();
          }
          if (!subtitle.date) {
            subtitle.date = new Date().toISOString();
          }
          
          return subtitle;
        });
        return {
          payload: preparedSubtitles
        };
      }
      
    },
    selectSubtitles(state, action: PayloadAction<string>) {
      state.selectedSubtitles = action.payload;
    },
    subtitlesLoaded(state, action: PayloadAction<Subtitle[]>) {
      state.subtitles = action.payload;
    },
    subtitleDelete(state, action: PayloadAction<string>) {
      const subtitleIndex = state.subtitles.findIndex(subtitle => subtitle.id === action.payload);
      if (subtitleIndex !== -1) {
        state.subtitles.splice(subtitleIndex, 1);
      }
    },
    subtitleLineDelete(state, action: PayloadAction<UpdateSubsObjectPayload>) {
      const { selectedSubtitlesId, id } = action.payload;
      const subtitleIndex = state.subtitles.findIndex(subtitle => subtitle.id === selectedSubtitlesId);
      if (subtitleIndex !== -1) {
        const lineIndex = state.subtitles[subtitleIndex].content.findIndex(line => line.id === id);
        if (lineIndex !== -1) {
          state.subtitles[subtitleIndex].content.splice(lineIndex, 1);
        }
      }
    },
    updateSubsObject(state, action: PayloadAction<Partial<UpdateSubsObjectPayload>>) {
      const { selectedSubtitlesId, id, learned, hard } = action.payload;
      const subtitlesIndex = state.subtitles.findIndex(subtitle => subtitle.id === selectedSubtitlesId);
      if (subtitlesIndex !== -1) {
        const subsIndex = state.subtitles[subtitlesIndex].content.findIndex(subsObj => subsObj.id === id);
        if (subsIndex !== -1) {
          if (learned !== undefined) {
            state.subtitles[subtitlesIndex].content[subsIndex].learned = !state.subtitles[subtitlesIndex].content[subsIndex].learned
          }
          if (hard !== undefined) {
            state.subtitles[subtitlesIndex].content[subsIndex].hard = !state.subtitles[subtitlesIndex].content[subsIndex].hard
          }
        }
      }
    }
  },
  
});
  
export const selectAllSubtitles = (state: { subtitles: SubtitlesState }) => state.subtitles.subtitles;

export const selectSubtitlesContent = (state: { subtitles: SubtitlesState }) =>
  state.subtitles.subtitles.map((subtitle) => subtitle.content );
export const selectSelectedSubtitles = (state: { subtitles: SubtitlesState }) =>
state.subtitles.selectedSubtitles;

export const selectedSubtitlesContent = (state: { subtitles: SubtitlesState }) =>
state.subtitles.subtitles.find(
  (subtitle) => subtitle.id === state.subtitles.selectedSubtitles
)?.content;

export const { subtitlesAdded, selectSubtitles, subtitlesLoaded, subtitleDelete, updateSubsObject, subtitleLineDelete } = subtitles.actions

export default subtitles.reducer