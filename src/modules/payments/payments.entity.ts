import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Job } from '../jobs/jobs.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  name!: string;

  @OneToOne(() => Job, (job) => job.reporter)
  job!: Job;
}
