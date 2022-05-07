import { Connection } from 'typeorm';
import { SeedHelper } from '../../../../../../common/db/seed';
import { AppsCategoryEntity } from '../../entities/start.entity.category';
import { AppsEntity } from '../../entities/start.entity.app';

export class InitialAppsSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  categories = [
    {
      categoryId: 1,
      domain: 'start',
      companyId: null,
      title: 'start',
      parentCategoryId: null,
    },
    {
      categoryId: 2,
      domain: 'business',
      title: 'FrontOffice',
      parentCategoryId: null,
    },
    {
      categoryId: 3,
      domain: 'business',
      title: 'BackOffice',
      parentCategoryId: null,
    },
    {
      categoryId: 4,
      domain: 'business',
      title: 'Finanzen',
      parentCategoryId: null,
    },
    {
      categoryId: 5,
      domain: 'business',
      title: 'Administration',
      parentCategoryId: null,
    },
    {
      categoryId: 6,
      domain: 'business',
      title: 'usermanagement',
      parentCategoryId: 5,
    },
    {
      categoryId: 7,
      domain: 'business',
      title: 'items',
      parentCategoryId: 3,
    },
    {
      categoryId: 8,
      domain: 'business',
      title: 'sales',
      parentCategoryId: 7,
    },
    {
      categoryId: 9,
      domain: 'business',
      title: 'profiles',
      parentCategoryId: 2,
    },
    {
      categoryId: 10,
      domain: 'business',
      title: 'reservation',
      parentCategoryId: 2,
    },

    {
      categoryId: 11,
      domain: 'business',
      title: 'Settings',
      parentCategoryId: null,
      companyId: 1
    },
  ];

  apps = [
    {
      appId: 2,
      domain: 'start',
      companyId: null,
      title: 'account',
      path: 'account.movit',
      categoryId: 1,
      img: '',
    },
    {
      appId: 3,
      domain: 'start',
      companyId: null,
      title: 'business',
      path: '/business/',
      categoryId: 1,
      img: '',
    },
    {
      appId: 4,
      domain: 'start',
      companyId: null,
      title: 'subscriptions',
      path: '/subscription/orders',
      categoryId: 1,
      img: '',
    },
    {
      appId: 11,
      domain: 'business',
      title: 'users',
      path: '/administration/user/overview',
      categoryId: 6,
      img: '',
    },
    {
      appId: 12,
      domain: 'business',
      title: 'role',
      path: '/administration/user/role',
      categoryId: 6,
      img: '',
    },
    {
      appId: 13,
      domain: 'business',
      title: 'profiles',
      path: '/frontoffice/crm/profiles/overview',
      categoryId: 9,
      img: '',
    },
    {
      appId: 14,
      domain: 'business',
      title: 'segments',
      path: '/frontoffice/crm/profiles/segments/overview',
      categoryId: 9,
      img: '',
    },
    {
      appId: 15,
      domain: 'business',
      title: 'priceclass',
      path: '/frontoffice/crm/profiles/priceclass/overview',
      categoryId: 9,
      img: '',
    },
    {
      appId: 16,
      domain: 'business',
      title: 'agenda',
      path: '/frontoffice/agenda/me',
      categoryId: 10,
      img: '',
    },
    {
      appId: 17,
      domain: 'business',
      title: 'agenda',
      path: '/frontoffice/agenda/employees',
      categoryId: 10,
      img: '',
    },
    {
      appId: 18,
      domain: 'business',
      title: 'agendalist',
      path: '/frontoffice/agenda/list',
      categoryId: 10,
      img: '',
    },
    {
      appId: 19,
      domain: 'business',
      title: 'languages',
      path: '/settings/locales/',
      categoryId: 11,
      img: '',
    },
    {
      appId: 20,
      domain: 'business',
      title: 'organisation',
      path: '/administration/business/overview',
      categoryId: 5,
      img: '',
    },
  ];

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<boolean>(async (resolve) => {
      for (let i = 0; i < this.categories.length; i++) {
        const cat = Object.assign(new AppsCategoryEntity(), this.categories[i]);
        await cat.save();
      }

      for (let i = 0; i < this.apps.length; i++) {
        const app = Object.assign(new AppsEntity(), this.apps[i]);
        app.categoryId = this.apps[i].categoryId;
        app.category = await AppsCategoryEntity.findOne(
          this.apps[i].categoryId
        );
        await app.save();
      }

      return resolve(true);
    });
  }
}
