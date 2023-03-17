<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared'
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Chat</title>
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="row flex-center flex p-16">
		<div class="col-8 form-widget">
			<Auth
				supabaseClient={data.supabase}
				view="sign_in"
				redirectTo={'/logging-in?redirect=/'}
				showLinks={true}
				appearance={{ theme: ThemeSupa ,style: { message: 'display: none' } }}
				onlyThirdPartyProviders={false}
				providers={['google', 'github']}
				socialLayout="vertical"
				theme="dark"
				localization={{
					variables: {
						sign_up: {
							email_label: 'メールアドレス',
							password_label: 'パスワード',
							email_input_placeholder: 'メールアドレス',
							password_input_placeholder: 'パスワード',
							button_label: '新規登録',
							loading_button_label: '新規登録中...',
							social_provider_text: '{{provider}}でログイン',
							link_text: '新しいアカウントを作成',
							confirmation_text: '確認用のリンクを送信しました\nメールを確認してください'
						},
						sign_in: {
							email_label: 'メールアドレス',
							password_label: 'パスワード',
							email_input_placeholder: 'メールアドレス',
							password_input_placeholder: 'パスワード',
							button_label: 'ログイン',
							loading_button_label: 'ログイン中...',
							social_provider_text: '{{provider}}でログイン',
							link_text: 'すでにアカウントをお持ちの場合'
						},
						magic_link: {
							email_input_label: 'メールアドレス',
							email_input_placeholder: 'メールアドレス',
							button_label: 'マジックリンク送信',
							loading_button_label: 'マジックリンク送信中...',
							link_text: 'マジックリンクでログイン',
							confirmation_text: 'マジックリンクを送信しました\nメールを確認してください'
						},
						forgotten_password: {
							email_label: '登録メールアドレス',
							password_label: '新しいパスワード',
							email_input_placeholder: '登録メールアドレス',
							button_label: 'パスワード再設定用リンク送信',
							loading_button_label: 'パスワード再設定用リンク送信中...',
							link_text: 'パスワードを忘れた場合',
							confirmation_text:
								'パスワード再設定用のリンクを送信しました\nメールを確認してください'
						},
						update_password: {
							password_label: 'パスワード',
							password_input_placeholder: 'パスワード',
							button_label: 'パスワード更新',
							loading_button_label: 'パスワード更新中...',
							confirmation_text: 'パスワードの更新が完了しました'
						}
					}
				}}
			/>
		</div>
	</div>
</div>
