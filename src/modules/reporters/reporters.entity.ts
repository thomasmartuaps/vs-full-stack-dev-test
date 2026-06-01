import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../jobs/jobs.entity';

@Entity()
export class Reporter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;

  @Column()
  location!: string;

  @Column()
  availability!: boolean;

  @OneToMany(() => Job, (job) => job.reporter)
  jobs!: Job[];
}
