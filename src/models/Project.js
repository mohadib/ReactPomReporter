class Project {

   constructor()
   {
      this.id="";
      this.name="";
      this.credentials=undefined;
      this.path="";
      this.xpathExpression="";
      this.info=undefined;
   }

   copy( other )
   {
      this.id=other.id;
      this.name=other.name;
      this.credentials=other.credentials;
      this.path=other.path;
      this.xpathExpression=other.xpathExpression;
      this.info=other.info;
      return this
   }


   isValid()
   {
      let valid =
         this.name.length > 0 &&
         this.path.length > 0 &&
         this.xpathExpression.length > 0 &&
         this.credentials !== null &&
         this.credentials !== undefined;
      return valid;
   }

}

export default Project