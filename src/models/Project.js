class Project {

   constructor()
   {
      this.id="";
      this.name="";
      this.credentials=undefined;
      this.url="";
      this.branch="";
      this.xpathExpression="";
      this.svnInfo=undefined;
   }

   copy( other )
   {
      this.id=other.id;
      this.name=other.name;
      this.credentials=other.credentials;
      this.url=other.url;
      this.branch=other.branch;
      this.xpathExpression=other.xpathExpression;
      this.svnInfo=other.svnInfo;
      return this
   }


   isValid()
   {
      let valid =
         this.name.length > 0 &&
         this.url.length > 0 &&
         this.xpathExpression.length > 0 &&
         this.credentials !== null &&
         this.credentials !== undefined;
      return valid;
   }

}

export default Project