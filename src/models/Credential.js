class Credential {

   constructor()
   {
      this.id = "";
      this.name = "";
      this.username = "";
      this.password = "";
      this.protocol = 'http';
      this.host = "";
      this.port = 0;
   }

   isValid()
   {
      let valid =
         this.name.length > 0 &&
         this.username.length > 0 &&
         !!this.password &&
         this.password.length > 0 &&
         this.protocol.length > 0 &&
         this.host.length > 0 &&
         (!isNaN(parseFloat(this.port)) && isFinite(this.port)) && this.port > 0;
      return valid;
   }

   copy( other )
   {
      this.id = other.id;
      this.name = other.name;
      this.username = other.username;
      this.password = other.password;
      this.protocol = other.protocol;
      this.host = other.host;
      this.port = other.port;
      return this;
   }
}

export default Credential