import fs from 'fs-extra';

const ROOT_DIRECTORY = './data/';

class JsonFileManager {
  constructor(fileName) {
    this.fileName = fileName;
    this.filePath = `${ROOT_DIRECTORY}${fileName}`;
    this.cachedData = null;
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      throw new Error(
        `Error reading JSON file '${this.fileName}': ${error.message}`
      );
    }
  }

  async writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(
        `Error writing JSON file '${this.fileName}': ${error.message}`
      );
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
      console.error(`🚨 JSON File Operation Error: ${error}`);
      throw error;
    }
  }

  async appendData(newData) {
    await this.updateFile(existingData => {
      existingData.push(newData);
      return existingData;
    });
  }

  async removeDataById(id) {
    await this.updateFile(existingData => {
      return existingData.filter(data => data.id !== id);
    });
  }

  async getDataById(id) {
    const existingData = await this.readCachedData();
    return existingData.find(data => data.id === id);
  }

  async isUnique(key, value) {
    const existingData = await this.readCachedData();
    // 데이터 O : 'false'
    // 데이터 X : 'true'
    return !existingData.some(data => data[key] === value);
  }
}

export default JsonFileManager;
