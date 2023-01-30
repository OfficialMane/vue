
const url = 'http://node-env.eba-u2thtivw.eu-west-2.elasticbeanstalk.com/lessons';

class LessonService {

  // Get Lessons
  static getLessons() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fetch(url);
        const lesson = result.json();
        resolve(
          lesson
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  // Update Lesson
  static updateLesson(id) {
    return fetch(`${url}/${id}`,{
      method:  'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        space: ''
      })
    })
  }
}

export default LessonService;
