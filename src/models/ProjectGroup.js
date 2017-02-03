class ProjectGroup
{
   constructor()
   {
      this.id = "";
      this.name = "";
      this.projects = [];
   }

   isValid()
   {
      return this.name.length > 0;
   }

   copy(other)
   {
      this.id = other.id;
      this.name = other.name;
      this.projects = other.projects;
      return this;
   }
}

export  default  ProjectGroup