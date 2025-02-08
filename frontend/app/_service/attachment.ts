import axios from "axios";

export interface IAttachment {
  id: number;
  attachmentGroupId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  fileType: 'image' | 'pdf' | 'text' | 'video' | 'audio' | 'archive' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttachmentGroup {
  id: number;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttachmentSingleSavePayload {
  file: File;
  attachmentGroupId?: number;
}

export interface AttachmentMultipleSavePayload {
  files: File[];
  attachmentGroupId?: number;
}

const ATTACHMENT_SERVICE_URL = `${process.env.SERVER_URL}/attachment`;
const ATTACHMENT_GROUP_SERVICE_URL = `${process.env.SERVER_URL}/attachment-group`;

export const attachmentService = {
  /** 파일 업로드
   * @param {File} file - 업로드할 파일 데이터
   * @param {number} [attachmentGroupId] - 파일 그룹 ID (선택적)
   * @returns {Promise<IAttachment>} - 업로드된 파일 정보 응답 데이터
   */
  uploadFile: async ({file, attachmentGroupId}: AttachmentSingleSavePayload): Promise<IAttachment> => {
    try {
      const formData = new FormData();
      formData.append('file', file); // 'file'은 서버에서 설정한 필드 이름과 일치해야 합니다.
      if (attachmentGroupId !== undefined) {
        formData.append('attachmentGroupId', attachmentGroupId.toString());
      }

      const response = await axios.post(`${ATTACHMENT_SERVICE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /** 여러 파일 업로드
   * @param {File[]} files - 업로드할 파일 데이터
   * @param {number} [attachmentGroupId] - 파일 그룹 ID (선택적)
   * @returns {Promise<IAttachment[]>} - 업로드된 파일 정보 응답 데이터
   */
  uploadMultipleFiles: async ({files, attachmentGroupId}: AttachmentMultipleSavePayload): Promise<IAttachment[]> => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      if (attachmentGroupId !== undefined) {
        formData.append('attachmentGroupId', attachmentGroupId.toString());
      }

      const response = await axios.post(`${ATTACHMENT_SERVICE_URL}/upload-multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /** 파일 그룹 조회
   * @param {number} id - 파일 ID
   * @returns {Promise<IAttachment[]>} - 파일 정보 응답 데이터
   */
  getAttachmentGroup: async (id: number): Promise<IAttachment[]> => {
    try {
      const response = await axios.get(`${ATTACHMENT_GROUP_SERVICE_URL}/${id}`);
      return response.data.attachments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /** 파일 조회
   * @param {number} id - 파일 ID
   * @returns {Promise<IAttachment>} - 파일 정보 응답 데이터
   */
  getAttachment: async (id: number): Promise<IAttachment> => {
    try {
      const response = await axios.get(`${ATTACHMENT_SERVICE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /** 파일 삭제
   * @param {number} id - 파일 ID
   * @returns {Promise<void>} - 삭제 완료 응답
   */
  deleteAttachment: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${ATTACHMENT_SERVICE_URL}/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /** 파일 다운로드
   * @param {number} id - 파일 ID
   * @returns {Promise<Blob>} - 다운로드된 파일 데이터
   */
  downloadAttachment: async (id: number): Promise<Blob> => {
    try {
      const response = await axios.get(`${ATTACHMENT_SERVICE_URL}/download/${id}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
