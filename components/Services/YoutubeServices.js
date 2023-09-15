class YoutubeService {
  constructor() {
      this.endpoint = "https://www.googleapis.com/youtube/v3/videos";
      this.TOKEN = 'AIzaSyAPDxKqHFeIlaK3ffzZgw9Oc4krpZfIiFI';
  }
  async getVideoInfoFromId(id) {
      const params = `?key=${this.TOKEN}&part=snippet,contentDetails&id=${id}`;
      const response = await fetch(this.endpoint + params);
      return await response.json();
  }
}
export default new YoutubeService();