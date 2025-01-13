//Anime Picture Search
const { SlashCommandBuilder } = require("discord.js");
const gelbooru = require("../../api/gelbooru");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("aps")
    .setDescription("Anime Picture Searching Tool")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("post")
        .setDescription("Image from the imageboard")
        .addStringOption((option) =>
          option.setName("tag").setDescription("Add tag"),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("validtag")
        .setDescription("Check if tag Exist")
        .addStringOption((option) =>
          option.setName("tag").setDescription("Add tag").setRequired(true),
        ),
    ),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    if (interaction.options.getSubcommand() === "post") {
      const tag = interaction.options.getString("tag");
      await interaction.deferReply();
      try {
        var message = ``;
        const option = {
          tags: tag,
          limit: 1,
        };
        const req = await gelbooru.getPost(option);

        const data = req.data;
        const attributes = data["@attributes"];
        const posts = data.post;

        for (let index in posts) {
          const post = posts[index];
          const id = post.id;
          const createdAt = post.created_at;
          const score = post.score;
          const width = post.width;
          const height = post.height;
          const md5 = post.md5;
          const directory = post.directory;
          const image = post.image;
          const rating = post.rating;
          const source = post.source;
          const change = post.change;
          const owner = post.owner;
          const creator_id = post.creator_id;
          const parent_id = post.parent_id;
          const sample = post.sample;
          const preview_height = post.preview_height;
          const preview_width = post.preview_width;
          const tags = post.tags;
          const title = post.title;
          const has_notes = post.has_notes;
          const has_comments = post.has_comments;
          const file_url = post.file_url;
          const preview_url = post.preview_url;
          const sample_url = post.sample_url;
          const sample_height = post.sample_height;
          const sample_width = post.sample_width;
          const status = post.status;
          const post_locked = post.post_locked;
          const has_children = post.has_children;

          message += preview_url + "\n";
        }
        await interaction.followUp(message);
      } catch (error) {
        console.log(error);
      }
    } else if (interaction.options.getSubcommand() === "validtag") {
      const tag = interaction.options.getString("tag");
      await interaction.deferReply();
      try {
        const req = await gelbooru.getTag(tag);
        const data = req.data;
        const attributes = data["@attributes"];
        if (attributes.count === 0) {
          await interaction.followUp("Tag is Invalid!");
        } else interaction.followUp("Tag is Valid!");

        // const tags = data.tag;
        //
        // for (let index in tags) {
        //   const tag = tags[index];
        //   const id = tag.id;
        //   const name = tag.name;
        //   const count = tag.count;
        //   const type = tag.type;
        //   const ambigious = tag.ambigious;
        // }
      } catch (error) {
        console.log(error);
        await interaction.followUp("Server Error!");
      }
    }
  },
};