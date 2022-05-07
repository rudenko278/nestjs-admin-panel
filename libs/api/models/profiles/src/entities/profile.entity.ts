import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileSegmentEntity } from './profile.segment.entity';
import { ProfileSourceEntity } from './profile.source.entity';
import { ProfileSegmentRelationEntity } from './profile.segment.relation.entity';
import { ProfilePriceClassEntity } from './profile.priceclass.entity';

@Entity('crm_profile')
@Index(['companyId'])
@Unique(['companyId', 'profileId'])
@Index(['companyId', 'vip'])
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @Column({ type: 'enum', enum: ['C', 'M', 'W'], nullable: false })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  birthDay: number;

  @Column({ type: 'smallint', nullable: true })
  vip: number | string;

  @Column({ type: 'smallint', nullable: true, unsigned: true })
  languageId: number;

  @OneToMany(() => ProfileSegmentRelationEntity, (segment) => segment.profile)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'profileId', referencedColumnName: 'profileId' },
  ])
  segments: ProfileSegmentRelationEntity[] | number[];

  @ManyToOne(() => ProfileSourceEntity, (source) => source.profiles)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'sourceId', referencedColumnName: 'sourceId' },
  ])
  sourceId: number;

  @ManyToOne(() => ProfilePriceClassEntity, (priceClass) => priceClass.profiles)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'priceClassId', referencedColumnName: 'priceClassId' },
  ])
  priceClassId: number;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  notes: string;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  constructor() {
    super();
  }

  public initialiseData(profile: Partial<ProfileEntity>) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.email = profile.email;
    this.phone = profile.phone;

    this.sourceId = profile.sourceId;
    this.notes = profile.notes;
    return this;
  }

  @BeforeInsert()
  protected async beforeInsert() {
    const lastEntry = await ProfileEntity.find({
      order: {
        profileId: 'DESC',
      },
      where: { companyId: this.companyId },
      take: 1,
    });
    this.profileId =
      lastEntry && lastEntry[0] ? +lastEntry[0].profileId + 1 : 1;
  }

  async forceSave() {
    while (!this.id) {
      try {
        await this.save();
      } catch (e) {}
    }
  }

  protected toJSON() {
    return this;
  }
}