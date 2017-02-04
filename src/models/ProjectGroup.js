class ProjectGroup
{
   constructor()
   {
      this.id = "";
      this.name = "";
      this.projects = [];
      this.isDefault = false;
   }

   isValid()
   {
      return this.name.length > 0;
   }

   copy(other)
   {
      this.id = other.id;
      this.name = other.name;
      this.projects = (other.projects === null || other.projects === undefined ) ? [] : other.projects;
      this.isDefault = other.isDefault;
      return this;
   }
}

export  default  ProjectGroup