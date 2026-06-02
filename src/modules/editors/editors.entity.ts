import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../jobs/jobs.entity';

@Entity()
export class Editor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;

  @OneToMany(() => Job, (job) => job.reporter)
  jobs!: Job[];
}
