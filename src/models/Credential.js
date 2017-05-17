class Credential {

   constructor()
   {
      this.id = "";
      this.name = "";
      this.username = "";
      this.password = "";
   }

   isValid()
   {
      let valid =
         this.name.length > 0 &&
         this.username.length > 0 &&
         !!this.password &&
         this.password.length > 0;
      return valid;
   }

   copy( other )
   {
      this.id = other.id;
      this.name = other.name;
      this.username = other.username;
      this.password = other.password;
      return this;
   }
}

export default Credential