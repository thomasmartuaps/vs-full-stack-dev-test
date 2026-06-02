import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Reporter } from '../reporters/reporters.entity';
import { Editor } from '../editors/editors.entity';
import { Payment } from '../payments/payments.entity';

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

  @ManyToOne(() => Editor, (editor) => editor.jobs)
  editor!: Editor;

  @OneToOne(() => Payment, (payment) => payment.job)
  payment!: Payment;
}
