import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity() 
export class Document {  

  @ObjectIdColumn()
  _id?: ObjectID;
  
  @Column()
  type?: string;

  @Column()
  value?: string;

  @Column()
  blacklist?: boolean;

}
