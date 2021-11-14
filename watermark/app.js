const Jimp = require('jimp');
const inquirer = require('inquirer');
const { exists } = require('fs');
// const exists = require('exists');

const addTextWatermarkToImage = async function (inputFile, outputFile, text) {
  try {
    const image = await Jimp.read(inputFile);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const textData = {
      text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    };
    image.print(font, 10, 10, textData, image.getWidth(), image.getHeight());
    image.rotate(30);
    await image.quality(100).writeAsync(outputFile);
    console.log('Success!');
    startApp();
  }
  catch (err) {
    console.log('Something went wrong... Try again!');
  }
};

const addImageWatermarkToImage = async function (inputFile, outputFile, watermarkFile) {
  try {
    const image = await Jimp.read(inputFile);
    const watermark = await Jimp.read(watermarkFile);
    const x = image.getWidth() / 2 - watermark.getWidth() / 2;
    const y = image.getHeight() / 2 - watermark.getHeight() / 2;

    image.composite(watermark, x, y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.5,
    });
    await image.quality(100).writeAsync(outputFile);
    console.log('Success!');
    startApp();
  }
  catch (err) {
    console.log('Something went wrong... Try again!');
  }
};

const prepareOutputFileName = function (fileName) {
  const partsOfFileName = fileName.split('.');
  const outputFileName = partsOfFileName[0] + '-with-watermark' + '.' + partsOfFileName[1];
  return outputFileName;
};

prepareOutputFileName('test.abc');

const startApp = async () => {

  // Ask if user is ready
  const answer = await inquirer.prompt([{
    name: 'start',
    message: 'Hi! Welcome to "Watermark manager". Copy your image files to `/img` folder. Then you\'ll be able to use them in the app. Are you ready?',
    type: 'confirm'
  }]);

  // if answer is no, just quit the app
  if (!answer.start) process.exit();

  // ask about input file and watermark type
  const options = await inquirer.prompt([{
    name: 'inputImage',
    type: 'input',
    message: 'What file do you want to mark?',
    default: 'test.jpg',
  }, {
    name: 'watermarkType',
    type: 'list',
    choices: ['Text watermark', 'Image watermark'],
  }]);

  if (options.watermarkType === 'Text watermark') {
    const text = await inquirer.prompt([{
      name: 'value',
      type: 'input',
      message: 'Type your watermark text:',
    }]);
    options.watermarkText = text.value;
    exists('./img/' + options.inputImage, (e) => {
      e ? addTextWatermarkToImage('./img/' + options.inputImage, './img/' + prepareOutputFileName(options.inputImage), options.watermarkText) : console.log('Something went wrong... Try again.');
    });
  }
  else {
    const image = await inquirer.prompt([{
      name: 'filename',
      type: 'input',
      message: 'Type your watermark name:',
      default: 'logo.png',
    }]);
    options.watermarkImage = image.filename;
    exists('./img/' + options.inputImage, (e) => {
      if (e) {
        exists('./img/' + options.watermarkImage, (e) => {
          e ? addImageWatermarkToImage('./img/' + options.inputImage, './img/' + prepareOutputFileName(options.inputImage), './img/' + options.watermarkImage) : console.log('Something went wrong... Try again.');
        });
      } else console.log('Something went wrong... Try again.');
    });
  }

}

startApp();