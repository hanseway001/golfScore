class Player {
    constructor(name, teeBox ) {
      this.name = name
      this.id = this.getNextId(5)
      this.teeBox = teeBox
      this.scores = []
    }
    
    
    getNextId(length) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    
        if (! length) {
            length = Math.floor(Math.random() * chars.length);
        }
    
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
      }
    //   this.scores = scores;
}