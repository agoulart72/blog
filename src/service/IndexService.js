import axios from "axios";

export class IndexService {

    async getArticles(page = 0, show = 3) {
        return await axios.create({
            baseURL: "/",
            responseType: "json"
        }).get('/art_list.json', {
            params: {
              results: 3,
              cols: 'article,file'
            }
        }).then (artData => {
            console.log("IndexService.getArticles :", artData);

            if (! Array.isArray(artData.data)) return [];
            while (page*show > artData.data.length) page -= 1;

            console.log(page, show)
            return artData.data.slice(page*show, page*show+show);
        });
    }

    async getLength() {
        return await axios.create({
            baseURL: "/",
            responseType: "json"
        }).get('/art_list.json', {
            params: {
              results: 3,
              cols: 'article,file'
            }
        }).then (artData => {
            if (! Array.isArray(artData.data)) return 0;
            return artData.data.length;
        });
    }

}

export default new IndexService();