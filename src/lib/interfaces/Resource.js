export default class Resource {
  constructor() {
    if (this.constructor === Resource) {
      throw new Error('Cannot instantiate abstract class')
    }
  }

  /**
   * @return Promise<Tree> The bookmarks tree as it is present on the server
   */
  async getBookmarksTree() {
    throw new Error('Not implemented')
  }

  /**
   * @param bookmark:Bookmark the bookmark to create
   * @return int the id of the new bookmark
   */
  async createBookmark(bookmark) {
    throw new Error('Not implemented')
  }

  /**
   * @param bookmark:Bookmark the bookmark with the new data
   * @returns (optional) new id of the bookmark
   */
  async updateBookmark(bookmark) {
    throw new Error('Not implemented')
  }

  /**
   * @param id:int the id of the bookmark to delete
   */
  async removeBookmark(id) {
    throw new Error('Not implemented')
  }

  /**
   * @param parentId:int the id of the parent node of the new folder
   * @param title:string the title of the folder
   * @return Promise<int> the id of the new folder
   */
  async createFolder(parentId, title) {
    throw new Error('Not implemented')
  }

  /**
   * @param id:int the id of the folder to be updated
   * @param title:string the new title
   */
  async updateFolder(id, title) {
    throw new Error('Not implemented')
  }

  /**
   * @param id:int the id of the folder
   * @param newParent
   */
  async moveFolder(id, newParent) {
    throw new Error('Not implemented')
  }

  /**
   * @param id:int the id of the folder
   */
  async removeFolder(id) {
    throw new Error('Not implemented')
  }
}
