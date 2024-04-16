import fs from 'fs-extra';

class JsonFileManager {
  constructor(filePath, initialData) {
    this.filePath = filePath;
    this.initialData = initialData;
    this.cachedData = null;
  }

  async readFile() {
    try {
      const stats = await fs.stat(this.filePath);
      if (stats.size === 0) return await this.createFileWithInitialData();

      const data = await fs.readFile(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') return this.createFileWithInitialData();
      throw this.errorMessage('reading', error);
    }
  }

  async createFileWithInitialData() {
    try {
      // 빈 파일 생성
      await fs.ensureFile(this.filePath);
      // 초기 데이터 쓰기
      await fs.writeFile(
        this.filePath,
        JSON.stringify(this.initialData, null, 2)
      );
      return this.initialData;
    } catch (error) {
      throw this.errorMessage('creating', error);
    }
  }

  async writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw this.errorMessage('writing', error);
    }
  }

  async readCachedData() {
    if (!this.cachedData) {
      this.cachedData = await this.readFile();
    }
    return this.cachedData;
  }

  async updateFile(operation) {
    try {
      const existingData = await this.readCachedData();
      const newData = await operation(existingData);
      await this.writeFile(newData);
      this.cachedData = newData; // Update cached data
    } catch (error) {
      throw this.errorMessage('updating', error);
    }
  }

  errorMessage(operation, error) {
    const fileName = this.filePath.split('/').pop();
    return new Error(
      `🚨 Error! Failed to ${operation} file - ${fileName} : ${error.message}`
    );
  }
}

export default JsonFileManager;
