import * as admin from 'firebase-admin';
const serviceAccount = require('../config/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
class FirebaseService {
  private config = admin.remoteConfig;

  public async getTemplate() {
    // const config = admin.remoteConfig();
    try {
      return this.config().getTemplate();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateTemplate() {
    // const config = admin.remoteConfig();
    try {
      const template = await this.getTemplate();

      template.conditions = [
        {
          name: 'ios',
          expression: "device.os == 'ios'",
          tagColor: 'BLUE',
        },
        {
          name: 'android',
          expression: "device.os == 'android'",
          tagColor: 'GREEN',
        },
      ];
      template.parameters = {
        welcome_message: {
          defaultValue: {
            value: 'Welcome!',
          },
          conditionalValues: {
            ios: {
              value: 'Welcome to our iOS app!',
            },
            android: {
              value: 'Welcome to our Android app!',
            },
          },
        },
      };
      await this.config().validateTemplate(template);
      const updatedTemplate = await this.config().publishTemplate(template);
      return updatedTemplate;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default FirebaseService;
