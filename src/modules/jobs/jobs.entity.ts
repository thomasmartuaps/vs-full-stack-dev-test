import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Reporter } from '../reporters/reporters.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  case_name!: string;

  @Column('interval')
  duration!: string;

  @Column()
  location!: 'physical' | 'remote';

  @Column()
  status!: 'NEW' | 'ASSIGNED' | 'TRANSCRIBED' | 'REVIEWED' | 'COMPLETED';

  @ManyToOne(() => Reporter, (reporter) => reporter.jobs)
  reporter!: Reporter;
}
